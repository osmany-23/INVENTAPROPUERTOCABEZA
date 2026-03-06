import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import user from "../../assets/images/brand_logo.png";

const URL_PROTOCOL_REGEX = /^[a-z][a-z\d+\-.]*:\/\//i;
const PLACEHOLDER_IMAGE_HINTS = ["no-image", "no_image", "placeholder"];
const IMAGE_PATH_PREFIXES = ["//", "/", "data:", "blob:"];
const IMAGE_OBJECT_KEYS = [
    "url",
    "src",
    "path",
    "image_url",
    "imageUrl",
    "image",
    "original",
    "original_url",
    "full_url",
];
const LIGHTBOX_COUNTER_STYLE = {
    fontSize: "13px",
    lineHeight: 1,
    fontWeight: 600,
    letterSpacing: "0.03em",
    color: "#ffffff",
    padding: "6px 10px",
    borderRadius: "999px",
    background: "rgba(12, 20, 34, 0.72)",
    backdropFilter: "blur(4px)",
};
const LIGHTBOX_ANIMATION_DURATION = 220;

const safeEncodeUrl = (value) => {
    if (!value) {
        return "";
    }

    if (value.startsWith("data:") || value.startsWith("blob:")) {
        return value;
    }

    try {
        return encodeURI(decodeURI(value));
    } catch (error) {
        return encodeURI(value);
    }
};

const getAbsoluteUrl = (value) => {
    const normalizedValue = (value || "").trim();
    if (!normalizedValue) {
        return "";
    }

    if (normalizedValue.startsWith("data:") || normalizedValue.startsWith("blob:")) {
        return normalizedValue;
    }

    if (normalizedValue.startsWith("//")) {
        if (typeof window === "undefined") {
            return `https:${normalizedValue}`;
        }

        return `${window.location.protocol}${normalizedValue}`;
    }

    if (URL_PROTOCOL_REGEX.test(normalizedValue)) {
        return normalizedValue;
    }

    const safePath = normalizedValue.replace(/\\/g, "/");
    if (typeof window === "undefined") {
        return safePath;
    }

    const pathWithSlash = safePath.startsWith("/") ? safePath : `/${safePath}`;
    try {
        return new URL(pathWithSlash, window.location.origin).toString();
    } catch (error) {
        return `${window.location.origin}${pathWithSlash}`;
    }
};

const normalizeImageInput = (value) => {
    if (Array.isArray(value)) {
        return value.flatMap(normalizeImageInput);
    }

    if (value && typeof value === "object") {
        const imageValues = IMAGE_OBJECT_KEYS.flatMap((key) =>
            normalizeImageInput(value[key])
        );

        if (imageValues.length > 0) {
            return imageValues;
        }

        return Object.values(value).flatMap(normalizeImageInput);
    }

    if (typeof value !== "string") {
        return [];
    }

    const normalizedValue = value.trim().replace(/^['"]|['"]$/g, "");
    if (!normalizedValue) {
        return [];
    }

    if (
        (normalizedValue.startsWith("[") && normalizedValue.endsWith("]")) ||
        (normalizedValue.startsWith("{") && normalizedValue.endsWith("}"))
    ) {
        try {
            return normalizeImageInput(JSON.parse(normalizedValue));
        } catch (error) {
            // Keep fallback behavior for raw string values.
        }
    }

    const isUrlLike =
        URL_PROTOCOL_REGEX.test(normalizedValue) ||
        normalizedValue.startsWith("//") ||
        normalizedValue.startsWith("/") ||
        normalizedValue.startsWith("data:") ||
        normalizedValue.startsWith("blob:");
    const isPathLikeValue = (candidate) => {
        const normalizedCandidate = String(candidate || "")
            .trim()
            .toLowerCase();
        if (!normalizedCandidate) {
            return false;
        }

        if (URL_PROTOCOL_REGEX.test(normalizedCandidate)) {
            return true;
        }

        return IMAGE_PATH_PREFIXES.some((prefix) =>
            normalizedCandidate.startsWith(prefix)
        );
    };

    const shouldSplitCommaValue = (() => {
        if (isUrlLike || !normalizedValue.includes(",")) {
            return false;
        }

        const parts = normalizedValue
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

        if (parts.length <= 1) {
            return false;
        }

        return parts.every(isPathLikeValue);
    })();

    if (shouldSplitCommaValue) {
        return normalizedValue
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
    }

    return [normalizedValue];
};

const buildSourceCandidates = (rawSource) => {
    const normalizedSource = String(rawSource || "").trim().replace(/^['"]|['"]$/g, "");
    if (!normalizedSource) {
        return [user];
    }

    const sourceCandidates = [
        normalizedSource,
        normalizedSource.replace(/\\/g, "/"),
        getAbsoluteUrl(normalizedSource),
    ].filter(Boolean);

    const uniqueCandidates = [];
    const addCandidate = (candidate) => {
        const cleanedCandidate = String(candidate || "").trim();
        if (!cleanedCandidate) {
            return;
        }

        const encodedCandidate = safeEncodeUrl(cleanedCandidate);
        if (encodedCandidate && !uniqueCandidates.includes(encodedCandidate)) {
            uniqueCandidates.push(encodedCandidate);
        }
    };

    sourceCandidates.forEach(addCandidate);
    addCandidate(user);

    return uniqueCandidates;
};

const isPlaceholderLikeImage = (value) => {
    const normalizedValue = String(value || "").toLowerCase();
    return PLACEHOLDER_IMAGE_HINTS.some((hint) => normalizedValue.includes(hint));
};

const ProductImageLightBox = ({ isOpen, setIsOpen, lightBoxImage }) => {
    const [photoIndex, setPhotoIndex] = useState(0);
    const [sourceIndexMap, setSourceIndexMap] = useState({});
    const isMountedRef = useRef(false);
    const isClosingRef = useRef(false);

    useEffect(() => {
        isMountedRef.current = true;

        return () => {
            isMountedRef.current = false;
            isClosingRef.current = true;
        };
    }, []);

    const imageSources = useMemo(() => {
        const normalizedImages = normalizeImageInput(lightBoxImage);

        const allEntries = [];
        const seenEntries = new Set();

        normalizedImages.forEach((image) => {
            const candidates = buildSourceCandidates(image);
            const signature = candidates[0];

            if (!signature || seenEntries.has(signature)) {
                return;
            }

            seenEntries.add(signature);
            allEntries.push(candidates);
        });

        if (allEntries.length <= 1) {
            return allEntries;
        }

        const nonPlaceholderEntries = allEntries.filter(
            (entry) => !isPlaceholderLikeImage(entry[0])
        );

        return nonPlaceholderEntries.length > 0
            ? nonPlaceholderEntries
            : allEntries;
    }, [lightBoxImage]);

    const totalImages = imageSources.length;
    const hasMultipleImages = totalImages > 1;

    useEffect(() => {
        if (isOpen) {
            isClosingRef.current = false;
            setPhotoIndex(0);
            setSourceIndexMap({});
        }
    }, [isOpen, totalImages]);

    const appElement = useMemo(() => {
        if (typeof document === "undefined") {
            return null;
        }

        return (
            document.getElementById("root") ||
            document.getElementById("app") ||
            null
        );
    }, []);

    const reactModalProps = useMemo(() => {
        if (appElement) {
            return {
                appElement,
                ariaHideApp: true,
            };
        }

        return {
            ariaHideApp: false,
        };
    }, [appElement]);

    const getImageSourceByIndex = useCallback(
        (index) => {
            const sourceCandidates = imageSources[index] || [user];
            const currentSourceIndex = sourceIndexMap[index] || 0;
            const safeSourceIndex = Math.min(
                currentSourceIndex,
                sourceCandidates.length - 1
            );

            return sourceCandidates[safeSourceIndex] || user;
        },
        [imageSources, sourceIndexMap]
    );

    const onCloseRequest = useCallback(() => {
        isClosingRef.current = true;
        if (isMountedRef.current) {
            setPhotoIndex(0);
            setSourceIndexMap({});
        }
        setIsOpen(false);
    }, [setIsOpen]);

    const onMovePrevRequest = useCallback(() => {
        if (!hasMultipleImages) {
            return;
        }

        setPhotoIndex((previousIndex) => {
            return (previousIndex + totalImages - 1) % totalImages;
        });
    }, [hasMultipleImages, totalImages]);

    const onMoveNextRequest = useCallback(() => {
        if (!hasMultipleImages) {
            return;
        }

        setPhotoIndex((previousIndex) => {
            return (previousIndex + 1) % totalImages;
        });
    }, [hasMultipleImages, totalImages]);

    const getIndexBySourceType = useCallback(
        (sourceType) => {
            if (sourceType === "mainSrc") {
                return photoIndex;
            }

            if (!hasMultipleImages) {
                return null;
            }

            if (sourceType === "nextSrc") {
                return (photoIndex + 1) % totalImages;
            }

            if (sourceType === "prevSrc") {
                return (photoIndex + totalImages - 1) % totalImages;
            }

            return null;
        },
        [hasMultipleImages, photoIndex, totalImages]
    );

    const onImageLoadError = useCallback(
        (_failedImage, sourceType) => {
            if (!isMountedRef.current || isClosingRef.current || !isOpen) {
                return;
            }

            const targetIndex = getIndexBySourceType(sourceType);

            if (targetIndex === null || targetIndex === undefined) {
                return;
            }

            setSourceIndexMap((previousMap) => {
                if (!isMountedRef.current || isClosingRef.current || !isOpen) {
                    return previousMap;
                }

                const sourceCandidates = imageSources[targetIndex] || [];
                const currentSourceIndex = previousMap[targetIndex] || 0;

                if (sourceCandidates.length === 0) {
                    return previousMap;
                }

                if (currentSourceIndex >= sourceCandidates.length - 1) {
                    return previousMap;
                }

                return {
                    ...previousMap,
                    [targetIndex]: currentSourceIndex + 1,
                };
            });
        },
        [getIndexBySourceType, imageSources, isOpen]
    );

    if (!isOpen || totalImages === 0) {
        return null;
    }

    const mainImageSource = getImageSourceByIndex(photoIndex);
    const nextImageSource = hasMultipleImages
        ? getImageSourceByIndex((photoIndex + 1) % totalImages)
        : undefined;
    const previousImageSource = hasMultipleImages
        ? getImageSourceByIndex((photoIndex + totalImages - 1) % totalImages)
        : undefined;

    return (
        <Lightbox
            mainSrc={mainImageSource}
            nextSrc={nextImageSource}
            prevSrc={previousImageSource}
            onCloseRequest={onCloseRequest}
            onMovePrevRequest={onMovePrevRequest}
            onMoveNextRequest={onMoveNextRequest}
            imageTitle={
                totalImages > 0 ? (
                    <span style={LIGHTBOX_COUNTER_STYLE}>
                        {photoIndex + 1} / {totalImages}
                    </span>
                ) : null
            }
            reactModalProps={reactModalProps}
            enableKeyboardInput={true}
            onImageLoadError={onImageLoadError}
            animationDuration={LIGHTBOX_ANIMATION_DURATION}
        />
    );
};

export default ProductImageLightBox;
