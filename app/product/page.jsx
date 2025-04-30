"use client"

import { CarCard } from '../../components'
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useBooleanValue } from '../context/CartBoolContext';
import QuantitySelector from '../../components/QuantitySelector';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useFavorites } from '../context/FavContext';
import { Heart, HeartFilled } from 'lucide-react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


const Page = () => {
  const [translateXValue, setTranslateXValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const searchParams = useSearchParams();
  const search = searchParams.get('id');
  let imgs, title, price, desc, cat, sub, discount, id
  const { cart, addToCart } = useCart();
  const { isBooleanValue, setBooleanValue } = useBooleanValue();
  const isInCart = cart?.some((item) => item._id === search);
  const router = useRouter();
  const [allTemp1, setAllTemps1] = useState();
  const [allTemp2, setAllTemps2] = useState();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorite = favorites.some((fav) => fav._id === search);
  const [zoomedImg, setZoomedImg] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]); // [{ size, price, qty }]
  const [selectedNames, setSelectedNames] = useState([]);

  const toggleSizeSelection = (sz) => {
    const exists = selectedSizes.find(s => s.size === sz.size);
    if (exists) {
      setSelectedSizes(prev => prev.filter(s => s.size !== sz.size));
    } else {
      setSelectedSizes(prev => [...prev, { ...sz, qty: 1 }]);
    }
  };

  const updateQty = (size, qty) => {
    setSelectedSizes(prev =>
      prev.map(s =>
        s.size === size ? { ...s, qty: Number(qty) } : s
      )
    );
  };


  const toggleFavorite = () => {
    isFavorite
      ? removeFromFavorites(allTemp1._id)
      : addToFavorites(allTemp1);
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`api/products/${search}`);
        const data = await response.json();
        console.log("data: ", data);

        setAllTemps1(data[0]);
      } catch (error) {
        console.error("Error fetching the description:", error);
      }
    };

    fetchData();
  }, []);






  if (allTemp1) {
    id = allTemp1._id;
    imgs = allTemp1.img;
    cat = allTemp1.category;
    title = allTemp1.title;
    price = allTemp1.price;
    discount = allTemp1.discount;
    desc = allTemp1.description;
    sub = allTemp1.subcategory;
  }


  useEffect(() => {
    if (cat) { // Ensures `cat` is defined before running the effect
      const fetchData = async () => {
        try {
          const response = await fetch(`api/products1/${cat}`);
          const data = await response.json();
          setAllTemps2(data);
        } catch (error) {
          console.error("Error fetching the description:", error);
        }
      };

      fetchData();
    }
  }, [cat]);


  useEffect(() => {
    console.log("selectedNames: ", selectedNames);

  }, [selectedNames]);






  const fetchPrice = async () => {
    const response = await fetchTemp4(search);
    setTemp1(response);
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  const sv = -8.3333333;

  const handleClick = (idx) => {
    setTranslateXValue(idx * sv);
  };




  function handleClickc() {
    var cartb = document.getElementById("cartid");
    var cartb2 = document.getElementById("cartid2");
    setBooleanValue(!isBooleanValue);
    if (cartb && cartb2) {
      if (isBooleanValue) {
        cartb2.className += " MiniCart_Cart-visible";
      } else {
        cartb2.classList.remove("MiniCart_Cart-visible");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();




    addToCart(allTemp1, quantity, selectedSizes, selectedNames);
    handleClickc();
  };


  const gotocart = () => {
    router.push('/checkout');
  };















  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: "\n\n.uploadcare--widget__button, .uploadcare--widget__button:hover {\n\tpadding: 10px;\n\tbackground-color: #d7d7d7; \n  color: #212529;\n  width:100%;\n}\n\n.uploadcare--widget__button:hover {\n\tbackground-color: #c1c1c1;\n  \n}\n\n\n"
        }}
      />

      <div className="ProductDetailWrapper  md:mt-[100px]">
        <div className="BreadcrumbsWrapper">
          <div className="br_flex br_px-6 xl:br_px-0 br_text-xs-sans-bold-stretched br_text-[12px] br_text-grey-400 br_h-12 br_items-center">
          </div>
        </div>
        <bellroy-product-detail data-filter-dimensions-style="WSSB,WSSB-CHA-213,WSSD-MIB-124,WSSB-BSH-102" data-default-sku="WSSB-BLACK" style={{}} data-updated-url="null">
          <div className="ProductDetail">
            <div className="Layout br_contents">
              <unsafe-html style={{ display: "none" }} />
              <events-enabled data-events="custom.product.view" />
              <div className="Layout_TwoColumns br_edition-">
                <section style={{ position: "relative" }}>
                  <span className="ProvidersIfSelectedProductMatchesFilter">
                    <div className="HtmlProductGallery">
                      <div className="HtmlProductGallery_GalleryWrapper">
                        <div className="HtmlProductInfiniteGallery" id="InfiniteGallery0" style={{ width: "auto", height: "100%" }}>
                          <style type="text/css" dangerouslySetInnerHTML={{
                            __html: "#InfiniteGallery0 .HtmlProductInfiniteGallery { }#InfiniteGallery0 .HtmlProductInfiniteGallery__Wrapper { position:relative;overflow:hidden;width:100%;height:100%}#InfiniteGallery0 .HtmlProductInfiniteGallery__Slides { position:absolute;top:0;width:1200%;height:100%;display:grid;grid-template-columns:repeat(12, 1fr);transition:transform 300ms ease;cursor:grab}#InfiniteGallery0 .HtmlProductInfiniteGallery__Slides--dragging { transition:none}#InfiniteGallery0 .HtmlProductInfiniteGallery__Slides_Slide { max-width:100%;max-height:100%;overflow:hidden;position:relative;user-drag:none;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}"
                          }} />
                          <div className="HtmlProductInfiniteGallery__Wrapper">
                            <div className="HtmlProductInfiniteGallery__Slides" style={{ transform: `translateX(${translateXValue}%)` }}>
                              {imgs && imgs?.length > 0 ? (
                                imgs.map((item, index) => (
                                  <div key={index} onClick={() => setZoomedImg(item)} style={{ cursor: "zoom-in" }}>
                                    <div className="HtmlProductInfiniteGallery__Slides_Slide">
                                      <div className="Slide Slide--image">
                                      <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.85)" zoomMargin={20}>
                                        <img src={item} style={{ maxWidth: "100%", height: "auto" }} />
                                        </Zoom>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="container">
                                  <h2 className="text-black text-xl font-bold">...</h2>
                                </div>
                              )}
                            </div>

 

                          </div>
                        </div>
                      </div>
                      <div className="HtmlProductGallery_Thumbnails">
                        {imgs && imgs?.length > 0 ? (
                          imgs.map((item, idx) => (
                            <button onClick={() => handleClick(idx)} className="Thumbnail Thumbnail--image">
                              <img src={"" + item} />
                            </button>
                          ))
                        ) : (
                          <div className='container'>
                            <h2 className='text-black text-xl dont-bold'>...</h2>
                          </div>
                        )}
                      </div>
                    </div>
                  </span>
                </section>
                <section className="ProductSelector">
                  <span className="ProvidersSingleProduct--selected">
                    <h1 className='myNewC'>
                      {title}
                      <span className="ProductSelector_EditionLabel" style={{ margin: "0 0 0 3px" }} />
                    </h1>
                    <p className='mb-2 myNewC'>
                      Category: {cat}
                    </p>
                    {sub && (
                      <p className='mb-2 myNewC'>
                        Subcategory: {sub}
                      </p>
                    )}


                  </span>
                  <div className="ApexPriceAndFreeShippingWrapper">

                    <div>
                      <div className="FreeShippingMessage FreeShippingMessage--empty" />
                    </div>
                  </div>
                  <hr />
                  <div className="ProductSelector_IntroBlurb">
                    <span className="ProvidersIfSelectedProductMatchesFilter">
                      <p
                        className='myNewC'
                        dangerouslySetInnerHTML={{ __html: desc }}
                      /><br />
                    </span>

                    <div className="flex items-center space-x-2">
                      {price && (
                        <h1 className="mb-2 myNewC br_line-through font-bold text-lg">${price}</h1>
                      )}
                      <h1 className="mb-2 myNewC font-bold text-lg">${discount}</h1>
                    </div>


                  </div>
                  <div className="bagsFeaturesGrid__gridWrapper">
                    {isInCart ? (
                      <>
                        <p style={{ color: "#222", textAlign: "center", fontSize: "2em", fontWeight: "bolder" }}>It's In Cart!</p>
                        <div className="">
                          <div className=""></div>
                          <div className="">
                            <span className="ProvidersSingleProduct--selected">
                              <button type="button" className="AddToCart HtmlProductAddToCart" style={{ borderRadius: "0" }} onClick={gotocart} >
                                <span>CHECKOUT NOW</span>
                              </button>
                            </span>
                          </div>
                          <div className=""></div>
                        </div>
                        <br />
                      </>
                    ) : (
                      <div>

                        <form onSubmit={handleSubmit}>
                          <div className="">




                            {!(
                              allTemp1?.sizes &&
                              allTemp1.sizes.length === 1 &&
                              allTemp1.sizes[0].size === "" &&
                              allTemp1.sizes[0].price === ""
                            ) &&
                              !(allTemp1?.sizes && allTemp1.sizes.length > 0) &&
                              !(allTemp1?.names && allTemp1.names.length > 0) && (
                                <QuantitySelector
                                  initialQty={quantity}
                                  onChange={setQuantity}
                                  productId={id}
                                />
                              )}




                            <div className=""></div>

                            {allTemp1?.sizes &&
                              allTemp1.sizes.length > 0 &&
                              !(allTemp1.sizes.length === 1 && allTemp1.sizes[0].size === "" && allTemp1.sizes[0].price === "") && (
                                <div className="my-4">
                                  <h2 className="font-semibold text-md mb-2">Select Sizes:</h2>
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {allTemp1.sizes.map((sz, idx) => (
                                      <button
                                        key={idx}
                                        type="button"
                                        onClick={() => toggleSizeSelection(sz)}
                                        className={`px-4 py-2 border rounded-md ${selectedSizes.some((s) => s.size === sz.size)
                                          ? 'bg-black text-white'
                                          : 'bg-white text-black border-gray-300'
                                          }`}
                                        id="button111"
                                      >
                                        {sz.size} (${sz.price})
                                      </button>
                                    ))}
                                  </div>

                                  {selectedSizes.length > 0 && (
                                    <div className="space-y-2">
                                      {selectedSizes.map((sz, idx) => (
                                        <div key={idx} className="flex items-center gap-4">
                                          <span className="font-medium" id="button111">{sz.size} (${sz.price})</span>
                                          <input
                                            type="number"
                                            min="1"
                                            value={sz.qty}
                                            onChange={(e) => updateQty(sz.size, e.target.value)}
                                            className="w-20 p-1 border border-gray-300 rounded-md"
                                            placeholder="Qty"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}






                            {allTemp1?.names &&
                              allTemp1.names.length > 0 &&
                              !(allTemp1.names.length === 1 && allTemp1.names[0] === "") && (
                                <div style={{ margin: '1rem 0' }}>
                                  <h2 style={{ fontWeight: '600', fontSize: '1rem', marginBottom: '0.5rem' }}>
                                    Select names:
                                  </h2>

                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {allTemp1.names.map((sz, idx) => {
                                      const isSelected = selectedNames?.some((item) => item.name === sz);
                                      const qty = selectedNames?.find((item) => item.name === sz)?.qty || '';

                                      const toggleSelection = () => {
                                        if (isSelected) {
                                          setSelectedNames((prev) => prev.filter((item) => item.name !== sz));
                                        } else {
                                          setSelectedNames((prev) => [...prev, { name: sz, qty: '1' }]);
                                        }
                                      };

                                      const handleQtyChange = (e) => {
                                        const value = e.target.value;
                                        setSelectedNames((prev) =>
                                          prev.map((item) =>
                                            item.name === sz ? { ...item, qty: value } : item
                                          )
                                        );
                                      };

                                      return (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                          <button
                                            type="button"
                                            onClick={toggleSelection}
                                            style={{
                                              padding: '0.5rem 1rem',
                                              border: '1px solid',
                                              borderRadius: '0.375rem',
                                              backgroundColor: isSelected ? 'black' : 'white',
                                              color: isSelected ? 'white' : 'black',
                                              borderColor: isSelected ? 'black' : '#d1d5db',
                                              cursor: 'pointer',
                                            }}
                                            id='button111'
                                          >
                                            {sz}
                                          </button>
                                          {isSelected && (
                                            <input
                                              type="number"
                                              min="0"
                                              value={qty}
                                              onChange={handleQtyChange}
                                              placeholder="Qty"
                                              style={{
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                border: '1px solid #d1d5db',
                                                width: '60px',
                                              }}
                                            />
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}













                            <div className="">
                              <span className="ProvidersSingleProduct--selected">
                                <div className='flex'>
                                  <button type="submit" className="AddToCart HtmlProductAddToCart" style={{ borderRadius: "0" }}>
                                    <span>ADD TO CART</span>
                                  </button>
                                  <a
                                    onClick={toggleFavorite}
                                    className="AddToCart m-4   "
                                    aria-label="Toggle Favorite"
                                  >
                                    <Heart
                                      size={24}
                                      className={`transition-all duration-200 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                                        }`}
                                    />
                                  </a>
                                </div>
                              </span>
                            </div>
                            <div className=""></div>
                          </div>
                        </form>

                      </div>
                    )}
                    <br />
                  </div>
                  <span className="ProvidersIfSelectedProductMatchesFilter">
                  </span>

                </section>
              </div>




              <span className="ProvidersIfSelectedProductMatchesFilter">
                <content-block slug="product-page-wssb">
                  <style dangerouslySetInnerHTML={{
                    __html: ".bagsFeaturesGrid{margin:0 auto;padding:30px 5%;background:#111622}.bagsFeaturesGrid__gridWrapper{max-width:1150px;margin:0 auto}.bagsFeaturesGrid__title{-webkit-font-smoothing:antialiased;text-align:center;padding:0 0 25px;margin:0 auto;color:#fff}.bagsFeaturesGrid__feature{background:inherit;display:grid;grid-template-s:auto;align-items:center;padding:5px 0}.bagsFeaturesGrid__feature--text{-webkit-font-smoothing:antialiased;text-align:center;padding:15px 0 20px;grid-:2}.bagsFeaturesGrid__feature--text a{color:inherit}.bagsFeaturesGrid__feature--text h3{color:#fff;padding-bottom:10px}.bagsFeaturesGrid__feature--text p{color:#eee}.bagsFeaturesGrid__feature--image{position:relative;width:100%;min-height:62vw}@media (min-width: 811px){.bagsFeaturesGrid__feature--image{min-height:28vw}}@media (min-width: 1460px){.bagsFeaturesGrid__feature--image{min-height:409px}}.bagsFeaturesGrid__feature--image img{width:100%;display:block}.bagsFeaturesGrid__feature--image--logo{position:absolute;bottom:3.5%;right:8%;width:15vw}.bagsFeaturesGrid__feature--image--logo img{width:100%}.bagsFeaturesGrid__feature--text--logo{width:100px;padding-top:30px}.bagsFeaturesGrid__feature--text--logo img{width:100%}@media (min-width: 811px){.bagsFeaturesGrid{padding:75px 10%}.bagsFeaturesGrid__title{padding:0 0 60px}.bagsFeaturesGrid__feature{display:grid;grid-template-columns:1fr 1fr;grid-template-s:auto;padding:30px 0}.bagsFeaturesGrid__feature--image--logo{width:7vw}.bagsFeaturesGrid__feature .left{padding-right:15%}.bagsFeaturesGrid__feature .right{padding-left:15%}.bagsFeaturesGrid__feature--text{-webkit-font-smoothing:antialiased;text-align:left;padding:0;grid-:auto}}"
                  }} />
                  <style dangerouslySetInnerHTML={{
                    __html: ".ProductTile-SliderContainer--YMAL .ProductTile-SliderContainer-Title{height:auto;text-align:center;padding-bottom:10px}.ProductTile-SliderContainer--YMAL.ProductTile-SliderContainer{padding:40px 0 10px;background-color:#eee ;display:flex;flex-direction:column;align-items:center}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev-ar,.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next-ar{height:25px;width:25px;border-top:2px solid #999;border-right:2px solid #999}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next-ar{transform:rotate(45deg);margin:0 15px 0 0}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev-ar{transform:rotate(225deg);margin:0 0 0 15px}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev,.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next{height:430px;width:80px;cursor:pointer;background-color:transparent;transition:opacity .3s ease;display:none;border:none;padding:0;appearance:none;-webkit-appearance:none}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev[disabled],.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next[disabled]{opacity:0;pointer-events:none}@media (min-width: 700px){.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev,.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next{display:flex;align-items:center;justify-content:center}}@media (min-width: 811px){.ProductTile-SliderContainer--YMAL .ProductTile-SliderContainer-Title{padding-bottom:30px}}.ProductTile-SliderContainer--YMAL .productRangeSlider{display:flex;align-items:center;max-width:1340px;width:100%;padding:5px;justify-content:space-between;margin:0 auto;min-height:145px}"
                  }} />
                  <div className="ProductTile-SliderContainer ProductTile-SliderContainer--YMAL" data-product-list-category="ymal-slider">


                    <section style={{ maxWidth: "100%" }}>
                      {allTemp1?.video && allTemp1?.video[0] ? (
                        <>
                          <div className="ProductTile-SliderContainer-Title br_text-3xl-serif br_text-gray myNewC">Product Video</div>
                          <video src={allTemp1.video[0]} controls />
                        </>
                      ) : (
                        <p></p>
                      )}
                    </section>


                  </div>
                </content-block>
              </span>





              <span className="ProvidersIfSelectedProductMatchesFilter">
                <content-block slug="product-page-wssb">
                  <style dangerouslySetInnerHTML={{
                    __html: ".bagsFeaturesGrid{margin:0 auto;padding:30px 5%;background:#111622}.bagsFeaturesGrid__gridWrapper{max-width:1150px;margin:0 auto}.bagsFeaturesGrid__title{-webkit-font-smoothing:antialiased;text-align:center;padding:0 0 25px;margin:0 auto;color:#fff}.bagsFeaturesGrid__feature{background:inherit;display:grid;grid-template-s:auto;align-items:center;padding:5px 0}.bagsFeaturesGrid__feature--text{-webkit-font-smoothing:antialiased;text-align:center;padding:15px 0 20px;grid-:2}.bagsFeaturesGrid__feature--text a{color:inherit}.bagsFeaturesGrid__feature--text h3{color:#fff;padding-bottom:10px}.bagsFeaturesGrid__feature--text p{color:#eee}.bagsFeaturesGrid__feature--image{position:relative;width:100%;min-height:62vw}@media (min-width: 811px){.bagsFeaturesGrid__feature--image{min-height:28vw}}@media (min-width: 1460px){.bagsFeaturesGrid__feature--image{min-height:409px}}.bagsFeaturesGrid__feature--image img{width:100%;display:block}.bagsFeaturesGrid__feature--image--logo{position:absolute;bottom:3.5%;right:8%;width:15vw}.bagsFeaturesGrid__feature--image--logo img{width:100%}.bagsFeaturesGrid__feature--text--logo{width:100px;padding-top:30px}.bagsFeaturesGrid__feature--text--logo img{width:100%}@media (min-width: 811px){.bagsFeaturesGrid{padding:75px 10%}.bagsFeaturesGrid__title{padding:0 0 60px}.bagsFeaturesGrid__feature{display:grid;grid-template-columns:1fr 1fr;grid-template-s:auto;padding:30px 0}.bagsFeaturesGrid__feature--image--logo{width:7vw}.bagsFeaturesGrid__feature .left{padding-right:15%}.bagsFeaturesGrid__feature .right{padding-left:15%}.bagsFeaturesGrid__feature--text{-webkit-font-smoothing:antialiased;text-align:left;padding:0;grid-:auto}}"
                  }} />
                  <style dangerouslySetInnerHTML={{
                    __html: ".ProductTile-SliderContainer--YMAL .ProductTile-SliderContainer-Title{height:auto;text-align:center;padding-bottom:10px}.ProductTile-SliderContainer--YMAL.ProductTile-SliderContainer{padding:40px 0 10px;background-color:#eee ;display:flex;flex-direction:column;align-items:center}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev-ar,.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next-ar{height:25px;width:25px;border-top:2px solid #999;border-right:2px solid #999}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next-ar{transform:rotate(45deg);margin:0 15px 0 0}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev-ar{transform:rotate(225deg);margin:0 0 0 15px}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev,.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next{height:430px;width:80px;cursor:pointer;background-color:transparent;transition:opacity .3s ease;display:none;border:none;padding:0;appearance:none;-webkit-appearance:none}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev[disabled],.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next[disabled]{opacity:0;pointer-events:none}@media (min-width: 700px){.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev,.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next{display:flex;align-items:center;justify-content:center}}@media (min-width: 811px){.ProductTile-SliderContainer--YMAL .ProductTile-SliderContainer-Title{padding-bottom:30px}}.ProductTile-SliderContainer--YMAL .productRangeSlider{display:flex;align-items:center;max-width:1340px;width:100%;padding:5px;justify-content:space-between;margin:0 auto;min-height:145px}"
                  }} />
                  <div className="ProductTile-SliderContainer ProductTile-SliderContainer--YMAL" data-product-list-category="ymal-slider">
                    <div className="ProductTile-SliderContainer-Title br_text-3xl-serif br_text-gray myNewC">You might also like:</div>
                    {allTemp2 && allTemp2?.length > 0 ? (
                      <section style={{ maxWidth: "100%" }}>
                        <Swiper spaceBetween={20} loop modules={[Autoplay]} autoplay={{
                          delay: 2000,
                          stopOnLastSlide: false,
                          reverseDirection: true
                        }} breakpoints={{
                          150: {
                            slidesPerView: 2,
                          },
                          768: {
                            slidesPerView: 4,
                          },
                        }}>
                          <div className='home__cars-wrapper'>
                            {allTemp2.map((temp) => (
                              <SwiperSlide key={temp._id}><CarCard temp={temp} /></SwiperSlide>
                            ))}
                          </div>
                        </Swiper>
                      </section>
                    ) : (
                      <div className='home___error-container'>
                        <h2 className='text-black text-xl dont-bold'>...</h2>
                      </div>
                    )}
                  </div>
                </content-block>
              </span>
            </div>
          </div>
        </bellroy-product-detail>
      </div>
    </>
  );
}

export default Page;
