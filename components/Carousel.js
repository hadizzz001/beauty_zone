"use client";

import React from "react";

const MyComponent = () => {
  return (
    <div className="relative w-full h-screen">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="vid.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="absolute bottom-20 w-full flex justify-center z-10">
        <a
          href="/shop"
          className="px-12 py-6 text-white font-bold text-lg rounded-full"
          style={{ backgroundColor: "#5bbccd", fontSize: "20px" }}
        >
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default MyComponent;
