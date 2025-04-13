import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const YourComponent = () => {
  const [allTemp2, setAllTemps2] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/category");
        const data = await response.json();
        setAllTemps2(data);
      } catch (error) {
        console.error("Error fetching the description:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <span className="ProvidersIfSelectedProductMatchesFilter">
      <content-block slug="product-page-wssb">
        <style dangerouslySetInnerHTML={{
          __html: `
            .ProductTile-SliderContainer--YMAL .ProductTile-SliderContainer-Title {
              height: auto;
              text-align: center;
              padding-bottom: 10px;
            }
            .car-card {
              display: flex;
              align-items: center;
              background-color: white;
              padding: 10px;
              border-radius: 10px;
              box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            }
            .car-card__image {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              object-fit: cover;
              margin-right: 15px;
            }
            .car-card__text {
              flex: 1;
            }
            .car-card__title {
              font-size: 1.2em;
              font-weight: bold;
            }
            .car-card__desc {
              font-size: 0.9em;
              color: #555;
            }
          `
        }} />
        <div className="mt-10 mb-10 ProductTile-SliderContainer ProductTile-SliderContainer--YMAL px-3" data-product-list-category="ymal-slider">
        
          {allTemp2 && allTemp2?.length > 0 ? (
            <section style={{ maxWidth: "100%" }}>
              <Swiper
                spaceBetween={50}
                loop
                modules={[Autoplay]}
                autoplay={{
                  delay: 2000,
                  stopOnLastSlide: false,
                  reverseDirection: true
                }}
                breakpoints={{
                  150: { slidesPerView: 2 },
                  768: { slidesPerView: 6 },
                }}
              >
                <div className='home__cars-wrapper'>
                  {allTemp2.map((temp) => (
                    <SwiperSlide key={temp.id}>
                      <a href={`/search?cat=${temp.name}`}>
                      <div className="car-card">
                        
                        <img src={temp.img} alt={temp.name} className="car-card__image" />
                        <div className="car-card__text">
                          <h3 className="car-card__title">{temp.name}</h3>
                          <p className="car-card__desc">{temp.description}</p>
                        </div>
                        </div>
                        </a>
                       
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
            </section>
          ) : (
            <div className='home___error-container'>
              <h2 className='text-black text-xl font-bold'>No Products Found</h2>
            </div>
          )}
        </div>
      </content-block>
    </span>
  );
};

export default YourComponent;
