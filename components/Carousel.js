'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const ImageComponent = () => {
  const router = useRouter();

  const handleShopNow = () => {
    router.push('/shop');
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        textAlign: 'center'
      }}
    >
      <img
        src="https://res.cloudinary.com/dmj4o6pc1/image/upload/v1751732028/4212821.webp"
        alt="WebP Illustration"
        style={{
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
          margin: '0 auto',
        }}
      />
      <button
        onClick={handleShopNow}
        style={{
          position: 'absolute',
          bottom: '2em',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#5bbccd',
          color: 'white',
          padding: '0.6em 1.5em',
          border: 'none',
          borderRadius: '999px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Shop Now
      </button>
    </div>
  );
};

export default ImageComponent;
