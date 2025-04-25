"use client";

import React from "react"; 

const MyComponent = () => {
  return (
    <div className="mt-1 relative">
      <div className="relative w-full">
        <video
          className="w-full h-[80vh] object-contain md:object-cover md:h-screen"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://res.cloudinary.com/dqzzfskhw/video/upload/v1745162997/WhatsApp_Video_2025-04-20_at_16.45.28_aqhgk7.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="absolute bottom-48 w-full flex justify-center">
        <a
          href="/shop"
          className="px-12 py-6 text-white font-bold text-lg rounded-full"
          style={{ backgroundColor: "#5bbccd" , fontSize:"20px"}}
        >
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default MyComponent;
