import React, { useEffect, useState } from "react";
import { Image, Form, Button } from "react-bootstrap-v5";
import { useDispatch } from "react-redux";
import { addToast } from "../../store/action/toastAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const mapExistingImages = (product) => {
    const imageUrls = product?.[0]?.images?.imageUrls || [];
    const imageIds = product?.[0]?.images?.id || [];

    return imageUrls
        .map((url, index) => ({
            id: imageIds[index],
            url,
        }))
        .filter((image) => Boolean(image.url));
};

const MultipleImage = (props) => {
    const {
        fetchFiles,
        product,
        transferImage,
        transferDeletedImageIds,
    } = props;
    const [images, setImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [removedImageIds, setRemovedImageIds] = useState([]);
    const dispatch = useDispatch();
    const currentProductId = product?.[0]?.id;

    useEffect(() => {
        const existingImages = mapExistingImages(product);
        const existingImageUrls = existingImages.map((item) => item.url);

        setOldImages(existingImages);
        setImages([]);
        setRemovedImageIds([]);
        fetchFiles([]);
        transferImage(existingImageUrls);
        if (typeof transferDeletedImageIds === "function") {
            transferDeletedImageIds([]);
        }
    }, [currentProductId]);

    useEffect(() => {
        if (images.length < 1) {
            setNewImages([]);
            return;
        }

        const newImageUrls = images.map((image) => URL.createObjectURL(image));
        setNewImages(newImageUrls);

        return () => {
            newImageUrls.forEach((imageUrl) => URL.revokeObjectURL(imageUrl));
        };
    }, [images]);

    const onRemove = (index) => {
        dispatch(
            addToast({
                text: getFormattedMessage("product.image.success.delete.message"),
            })
        );

        setImages((prevImages) => {
            const nextImages = prevImages.filter((file, i) => i !== index);
            fetchFiles(nextImages);
            if (nextImages.length === 0) {
                const input = document.getElementById("productImage");
                if (input) {
                    input.value = "";
                }
            }
            return nextImages;
        });
    };

    const oldRemoveOld = (index) => {
        const imageToRemove = oldImages[index];
        if (!imageToRemove) {
            return;
        }

        const nextOldImages = oldImages.filter((file, i) => i !== index);
        setOldImages(nextOldImages);
        transferImage(nextOldImages.map((item) => item.url));
        setRemovedImageIds((prevIds) => {
            const nextRemovedImageIds =
                imageToRemove.id === undefined || imageToRemove.id === null
                    ? prevIds
                    : Array.from(
                          new Set([...prevIds, Number(imageToRemove.id)])
                      );
            if (typeof transferDeletedImageIds === "function") {
                transferDeletedImageIds(nextRemovedImageIds);
            }
            return nextRemovedImageIds;
        });

        dispatch(
            addToast({
                text: getFormattedMessage("product.image.success.delete.message"),
            })
        );
    };

    const onUploadImage = (e) => {
        e.preventDefault();
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length < 1) {
            return;
        }

        setImages((prevImages) => {
            const nextImages = [...selectedFiles, ...prevImages];
            fetchFiles(nextImages);
            return nextImages;
        });

        dispatch(
            addToast({
                text: getFormattedMessage("product.image.success.upload.message"),
            })
        );
    };

    const handleClick = (event) => {
        const { target = {} } = event || {};
        target.value = "";
    };

    return (
        <>
            <Form.Group className="mb-3">
                <Form.Control
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    id="productImage"
                    onClick={handleClick}
                    className="upload-input-file"
                    multiple
                    onChange={onUploadImage}
                />
            </Form.Group>
            <div className="imagePreviewContainer pt-3 p-0 d-flex flex-wrap">
                {newImages &&
                    newImages.map((newImage, i) => (
                        <div
                            className="previewItem custom-preview position-relative cursor-pointer"
                            key={i}
                        >
                            <Image className="imagePreview" src={newImage} />
                            <Button
                                type="button"
                                onClick={() => onRemove(i)}
                                className="remove-btn p-0"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </div>
                    ))}
                {oldImages &&
                    oldImages.map((oldImage, i) => {
                        return (
                            <div
                                className="previewItem custom-preview position-relative cursor-pointer"
                                key={`${oldImage.id || oldImage.url}-${i}`}
                            >
                                <Image
                                    className="imagePreview"
                                    src={oldImage.url}
                                />
                                <Button
                                    type="button"
                                    onClick={() => oldRemoveOld(i)}
                                    className="remove-btn p-0"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default MultipleImage;
