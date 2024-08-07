import React from "react";
import Slider from "react-slick";
import "../App.css";
function SimpleSlider() {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div
      className="slider-container"
      style={{ maxWidth: "1900px", width: "100%", maxHeight: "100px" }}
    >
      <Slider {...settings}>
        <div>
          <img
            src="https://media.istockphoto.com/id/2148684016/photo/fresh-salads-overhead-flat-lay-shot-of-an-assortment-variety-of-plates.webp?b=1&s=170667a&w=0&k=20&c=zSTFdIP7z2fBVsKT_U_CAf6SDw32YbHHFKH-ghEvRPc="
            alt="Random Food"
            style={{ width: "100%", height: "500px" }}
          />
        </div>
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfFos0j8Ft25-zLEPPUz4aVVEdjvFEbGtRMGiVji5wkX9SVtTH5aHfh9NYYlW6hm0Jjmo&usqp=CAU"
            alt="Random Food"
            style={{ width: "100%", height: "500px" }}
          />
        </div>
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTql5NmJxyXoxaMJqO25TGCpUfkcZza-BvndQ&s"
            alt="Random Food"
            style={{ width: "100%", height: "500px" }}
          />
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
