import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CarCard from './CarCard'; // Ensure this component exists

const YourComponent = () => {
  const [groupedProducts, setGroupedProducts] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products', { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();

        // Filter out products in the "Hot Sale" category
        const filteredData = data.filter(item => item.category !== 'Hot Sale');

        // Group products by their category
        const groups = filteredData.reduce((acc, product) => {
          const { category } = product;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {});

        // Define the desired category order
        const categoryOrder = ['Men Shoes', 'Women Shoes', 'Kids Shoes','Men Clothes', 'Women Clothes', 'Kids Clothes'];

        // Sort grouped products based on the predefined order
        const sortedGroups = {};
        categoryOrder.forEach((category) => {
          if (groups[category]) {
            sortedGroups[category] = groups[category];
          }
        });

        setGroupedProducts(sortedGroups);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="ProvidersIfSelectedProductMatchesFilter mt-4">
      {groupedProducts && Object.keys(groupedProducts).length > 0 ? (
        Object.keys(groupedProducts).map((category) => (
          <div key={category}>
            <style
              dangerouslySetInnerHTML={{
                __html: ".ProductTile-SliderContainer--YMAL .ProductTile-SliderContainer-Title{height:auto;text-align:center; }",
              }}
            />
            <div className="ProductTile-SliderContainer ProductTile-SliderContainer--YMAL px-3" data-product-list-category="ymal-slider">
              <div
                className="ProductTile-SliderContainer-Title br_text-3xl-serif br_text-[#333]"
                style={{
                  textAlign: "left",
                  fontSize: "1.3em",
                  fontWeight: "bold",
                  fontFamily: 'Manrope'
                }}
              >
                <a href={`/search?cat=${category}`}>{category}</a>
                <span style={{ position: "absolute", right: "1em" }}>
                  <svg
                    fill="#000000"
                    viewBox="0 0 24 24"
                    id="right-arrow"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon line"
                    width={42}
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                    <g id="SVGRepo_iconCarrier">
                      <path
                        id="primary"
                        d="M3,12H21m-3,3,3-3L18,9"
                        style={{
                          fill: "none",
                          stroke: "#000000",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "1.5",
                        }}
                      />
                    </g>
                  </svg>
                </span>
              </div>

              {groupedProducts[category].length > 0 ? (
                <section className="mb-5" style={{ maxWidth: "100%" }}>
                  <Swiper
                    spaceBetween={5}
                    loop
                    breakpoints={{
                      150: { slidesPerView: 3 },
                      768: { slidesPerView: 6 },
                    }}
                  >
                    <div className="home__cars-wrapper">
                      {groupedProducts[category].map((product) => (
                        <SwiperSlide key={product.id}>
                          <CarCard temp={product} />
                        </SwiperSlide>
                      ))}
                    </div>
                  </Swiper>
                </section>
              ) : (
                <p>No products available in {category}</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="home___error-container">
          <h2 className="text-black text-xl font-bold">No products available</h2>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
