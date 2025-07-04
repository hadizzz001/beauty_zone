'use client';

import React from "react";

const MyComponent = () => {
  return (
    <div className="relative w-full h-screen">
      <img
        src="https://res.cloudinary.com/dmj4o6pc1/image/upload/v1751642673/wallpaper.webp" // Replace with your actual image path
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover object-right z-0"
      />

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
