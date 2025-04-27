import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const CatSlider1 = ({ subcategories }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  ]);

  const [slidesToShow, setSlidesToShow] = useState(2);

  const updateSlidesToShow = useCallback(() => {
    const width = window.innerWidth;
    if (width >= 768) setSlidesToShow(5);
    else setSlidesToShow(2);
  }, []);

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, [updateSlidesToShow]);

  if (!subcategories?.length) return null;

  return (
    <div className="w-full mt-5 px-3" data-product-list-category="subcategory-slider">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .subcategory-card {
              position: relative;
              width: 100%;
              aspect-ratio: 1 / 1;
              overflow: hidden; 
            }

            .subcategory-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block; 
            }

            .subcategory-overlay {
              position: absolute; 
              left: 0;
              width: 100%;
              padding: 10px; 
              color: gray;
              text-align: center;
            }

            .subcategory-title {
              font-size: 11px;
              font-weight: bold;
              text-transform: uppercase;
              margin: 0;
            }

            .embla__slide {
              flex: 0 0 calc(100% / ${slidesToShow});
              padding: 0 5px;
            }
          `,
        }}
      />
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex" id='emblaid'>
          {subcategories.map((sub) => (
            <div className="embla__slide" key={sub.id}>
              <a href={`/search?sub=${encodeURIComponent(sub.name)}`}>
                <div className="subcategory-card">
                  <img src={sub.img[0]} alt={sub.name} className="subcategory-image" />
                  <div className="subcategory-overlay">
                    <h3 className="subcategory-title" id='button222'>{sub.name}</h3>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatSlider1;
