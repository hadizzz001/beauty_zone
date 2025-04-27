import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

export default function OfferHeadline() {
  return (
    <div
      style={{
        backgroundColor: "#5bbccd",
        color: "white",
        fontSize: "14px",
        padding: "5px 0",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 99999999,
      }}
    >
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
<SwiperSlide>
  <div style={{ textAlign: "center" }}>
    Be Aware Of Fake Products Spreading All Over Market Delivery All Over Lebanon
  </div>
</SwiperSlide>
<SwiperSlide>
  <div style={{ textAlign: "center" }}>
    Products Are Shipped To Meet European Standards
  </div>
</SwiperSlide>
<SwiperSlide>
  <div style={{ textAlign: "center" }}>
    Cash On Delivery / High Quality / Authorized Seller
  </div>
</SwiperSlide>

      </Swiper>
    </div>
  );
}
