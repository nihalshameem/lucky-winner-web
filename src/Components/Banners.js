import React, { useEffect, useState } from "react";
import { bannersApi, imageUrl } from "./APIConst";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

function Banners() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    bannersApi()
      .then((res) => {
        setImages(res.data.banners);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  return (
    <div>
      <AliceCarousel
        autoPlay
        autoPlayInterval="2000"
        disableButtonsControls={true}
        disableSlideInfo={true}
        infinite={true}
        mouseDragEnabled={true}
      >
        {images.map((item) => (
          <img
            src={imageUrl(item.image)}
            className="sliderimg"
            alt={item.name}
            key={item.id}
          />
        ))}
      </AliceCarousel>
    </div>
  );
}

export default Banners;
