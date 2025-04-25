import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { useState, useEffect } from "react";
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const Review = () => {
  const [allTemp, setTemp] = useState<any>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('/api/rate');
    if (response.ok) {
      const data = await response.json();
      setTemp(data);
    } else {
      console.error('Failed to fetch reviews');
    }
  };

  return (
    <div id="review-container">
      {/* Swiper Slider */}
      <div id="review-slider">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop={true}
        >
          {allTemp?.length > 0 ? (
            allTemp.map((post: any, i: number) => (
              <SwiperSlide key={i}>
                <div className="review-card">
                  <img
                    className="review-avatar"
                    src="https://www.svgrepo.com/show/527946/user-circle.svg"
                    alt="User"
                  />
                  <p className="review-name">{post.name}</p>
                  <div className="review-stars">
                    {Array.from({ length: post.stars }, (_, index) => (
                      <svg
                        key={index}
                        className="review-star"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="review-text">{post.description}</p>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <div className="review-loading">Loading...</div>
          )}
        </Swiper>
      </div>

      {/* Why Choose Us */}
      <div id="why-choose-us">
        <h2>Why Choose Us</h2>
        <ul>
          {[
            "Premium Quality Machines tested and used by professionals",
            "Certified & Guaranteed for safety and performance",
            "Dedicated Support to guide you before and after purchase",
            "Fast Shipping with secure packaging",
            "Trusted by Clinics & Specialists across the region"
          ].map((item, idx) => (
            <li key={idx}>
              <svg className="check-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Review;
