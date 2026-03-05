import React, { useCallback, useEffect, useMemo, useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const ProductImageLightBox = ({ isOpen, setIsOpen, lightBoxImage }) => {
    const [photoIndex, setPhotoIndex] = useState(0);

    const images = useMemo(() => {
        if (!Array.isArray(lightBoxImage)) {
            return [];
        }

        return lightBoxImage.filter(Boolean);
    }, [lightBoxImage]);

    const totalImages = images.length;
    const hasMultipleImages = totalImages > 1;

    useEffect(() => {
        if (isOpen) {
            setPhotoIndex(0);
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

    const onCloseRequest = useCallback(() => {
        setPhotoIndex(0);
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

    if (!isOpen || totalImages === 0 || !images[photoIndex]) {
        return null;
    }

    return (
        <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={
                hasMultipleImages
                    ? images[(photoIndex + 1) % totalImages]
                    : undefined
            }
            prevSrc={
                hasMultipleImages
                    ? images[(photoIndex + totalImages - 1) % totalImages]
                    : undefined
            }
            onCloseRequest={onCloseRequest}
            onMovePrevRequest={onMovePrevRequest}
            onMoveNextRequest={onMoveNextRequest}
            reactModalProps={reactModalProps}
            enableKeyboardInput={true}
        />
    );
};

export default ProductImageLightBox;
