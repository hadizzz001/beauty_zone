"use client"
import { useState, useEffect } from 'react';

const GifLoader = () => {
  const [showGif, setShowGif] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowGif(false);
    }, 2000);

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    
    <>
      {showGif && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex:"9999999999"
          }}
        >
          <div
            style={{
              width:"5em",
              zIndex:"9999999999"
            }}
          >
            <img src="/load.gif" alt="Loading" />
          </div>
        </div>
      )}
    </>

  );
};

export default GifLoader;
