import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import CatSlider1 from '../components/Catslider1'

const YourComponent = () => {
  const [allTemp2, setAllTemps2] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredSubs, setFilteredSubs] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();
        setAllTemps2(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await fetch("/api/sub");
        const data = await res.json();
        setSubcategories(data);
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      }
    };
    fetchSubcategories();
  }, []);

  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName);
    const filtered = subcategories.filter((sub) => sub.category === catName);
    setFilteredSubs(filtered);
  };




  return (
    <span  >

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .ProductTile-SliderContainer--YMAL .ProductTile-SliderContainer-Title {
              height: auto;
              text-align: center;
              padding-bottom: 10px;
            }
            .car-card {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .car-card__image {
              width: 120px;
              height: 120px;
              object-fit: cover;
              margin-bottom: 10px;
            }
            .car-card__text {
              text-align: center;
            }
            .car-card__title {
              font-size: .9em;
              font-weight: bold;
              text-transform: uppercase;
              margin: 20px 0;
            }
            .car-card__desc {
              font-size: 0.9em;
              color: #555;
            }
          `,
        }}
      />
      <div className="mt-10 mb-10 ProductTile-SliderContainer ProductTile-SliderContainer--YMAL px-3">
        {allTemp2 && allTemp2.length > 0 ? (
          <>
            <section style={{ maxWidth: '100%' }}>
              <Swiper
                spaceBetween={0}
                loop
                breakpoints={{
                  150: { slidesPerView: 2 },
                  768: { slidesPerView: 6 },
                }}
              >
                <div className="home__cars-wrapper">
                  {allTemp2.map((temp) => (
                    <SwiperSlide key={temp.id}>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleCategoryClick(temp.name)}
                      >
                        <div className="car-card">
                          <img src={temp.img} alt={temp.name} className="car-card__image" />
                          <div className="car-card__text">
                            <h3 className="car-card__title">{temp.name}</h3>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>



            </section>

            {selectedCategory && filteredSubs.length > 0 && (

              <CatSlider1 subcategories={filteredSubs} />

            )}
          </>
        ) : (
          <div className="home___error-container">
            <h2 className="text-black text-xl font-bold">No Products Found</h2>
          </div>
        )}
      </div>

    </span>
  );
};

export default YourComponent;
