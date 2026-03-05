import React, { useCallback, useEffect, useMemo, useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const ProductImageLightBox = ({ isOpen, setIsOpen, lightBoxImage }) => {
    const [photoIndex, setPhotoIndex] = useState(0);

    const images = useMemo(() => {
        if (!Array.isArray(lightBoxImage)) {
            return [];
        }
        // Filtrar imágenes vacías o nulas
        return lightBoxImage.filter(Boolean);
    }, [lightBoxImage]);

    const totalImages = images.length;

    useEffect(() => {
        if (isOpen) {
            setPhotoIndex(0);
        }
    }, [isOpen]);

    useEffect(() => {
        if (photoIndex >= totalImages && totalImages > 0) {
            setPhotoIndex(0);
        }
    }, [photoIndex, totalImages]);

    const onCloseRequest = useCallback(() => {
        setPhotoIndex(0);
        setIsOpen(false);
    }, [setIsOpen]);

    const onMovePrevRequest = useCallback(() => {
        if (totalImages <= 1) return;
        setPhotoIndex((previousIndex) =>
            previousIndex === 0 ? totalImages - 1 : previousIndex - 1
        );
    }, [totalImages]);

    const onMoveNextRequest = useCallback(() => {
        if (totalImages <= 1) return;
        setPhotoIndex((previousIndex) =>
            previousIndex === totalImages - 1 ? 0 : previousIndex + 1
        );
    }, [totalImages]);

    if (!isOpen || totalImages === 0 || !images[photoIndex]) {
        return null;
    }

    // Log visual para depuración
    console.log('Lightbox abierto:', { photoIndex, totalImages, images });

    return (
        <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images.length > 1 ? images[(photoIndex + 1) % totalImages] : undefined}
            prevSrc={images.length > 1 ? images[(photoIndex + totalImages - 1) % totalImages] : undefined}
            onCloseRequest={onCloseRequest}
            onMovePrevRequest={onMovePrevRequest}
            onMoveNextRequest={onMoveNextRequest}
            enableZoom={true}
            imageTitle={`Imagen ${photoIndex + 1} de ${totalImages}`}
        />
    );
};

export default ProductImageLightBox;
