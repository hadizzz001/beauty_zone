import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CarCard from './CarCard';
import { Autoplay } from 'swiper/modules';

const YourComponent = () => {
  const [groupedProducts, setGroupedProducts] = useState({});

  const categoryOrder = [
    "Beauty & Skin care machine",
    "Skin care products",
    "Nails",
    "Spa products",
    "Tattoo",
    "Perma x Tina",
    "Piercing",
    "Lashes",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

const fetchProducts = async () => {
  try {
    const response = await fetch('/api/products', { cache: 'no-store' });
    if (response.ok) {
      const data = await response.json();

      const groups = data.reduce((acc, product) => {
        const { category } = product;
        if (category === 'Hot Sale') return acc;

        if (!acc[category]) acc[category] = [];

        // Only add product if less than 5 in that category
        if (acc[category].length < 5) {
          acc[category].push(product);
        }

        return acc;
      }, {});

      setGroupedProducts(groups);
    } else {
      console.error('Failed to fetch products');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};


  const renderCategory = (category) => (
    groupedProducts[category]?.length > 0 && (
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
            <a href={`/search?cat=${encodeURIComponent(category)}`}>{category}</a>
            <span style={{ position: "absolute", right: "1em" }}>
              <svg
                fill="#000000"
                viewBox="0 0 24 24"
                id="right-arrow"
                xmlns="http://www.w3.org/2000/svg"
                className="icon line"
                width={42}
              >
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
              </svg>
            </span>
          </div>

          <section className="mb-5" style={{ maxWidth: "100%" }}>
            <Swiper
              spaceBetween={5}
              loop modules={[Autoplay]} autoplay={{
                delay: 2000,
                stopOnLastSlide: false,
                reverseDirection: true
              }}
              breakpoints={{
                150: { slidesPerView: 2 },
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
        </div>
      </div>
    )
  );

  return (
    <div className="ProvidersIfSelectedProductMatchesFilter mt-4">
      {/* First: show your custom order categories */}
      {categoryOrder.map((category) => renderCategory(category))}

      {/* Then: show all other remaining categories */}
      {Object.keys(groupedProducts)
        .filter((cat) => !categoryOrder.includes(cat))
        .map((category) => renderCategory(category))}
    </div>
  );
};

export default YourComponent;
