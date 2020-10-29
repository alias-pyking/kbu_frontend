import React from "react";
import ImageGallery from 'react-image-gallery';

function ImageSlider(props){
    const images = props.images.map(image => {
      return {
        original: image,
        thumbnail: image,
      }
    });
    return <ImageGallery items={images} />;

}

export default ImageSlider;