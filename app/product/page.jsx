"use client"

import { Test, CarCard } from '../../components'
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useBooleanValue } from '../context/CartBoolContext';
import QuantitySelector from '../../components/QuantitySelector';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css'; 
import Head from 'next/head'

const Page = () => {
  const [code, setCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [translateXValue, setTranslateXValue] = useState(0);
  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(true);
  const [quantity, setQuantity] = useState(1); // State for quantity
  let b;
  let b2;
  const searchParams = useSearchParams();
  const search = searchParams.get('id');
  const custom = searchParams.get('custom');
  const imgg = searchParams.get('imgg');
  let imgs, title, price, desc, cat, brand, sub, box, colors, sizes;
  const { cart, addToCart } = useCart();
  const { isBooleanValue, setBooleanValue } = useBooleanValue();
  const targetRef = useRef(null);
  const [errors, setErrors] = useState({});
  const isInCart = cart?.some((item) => item._id === search);
  const specificItem = cart?.find((cartItem) => String(cartItem._id) === String(search));
  const router = useRouter();
  const [allTemp1, setAllTemps1] = useState();
  const [allTemp2, setAllTemps2] = useState(); 

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all products
        const response = await fetch('api/products');
        const data = await response.json();
        console.log("all data: ", data);
  
        // Filter the data based on the search criteria (assuming 'search' is the id)
        const filteredProduct = data.filter(item => item._id === search);
        console.log("all filteredProduct: ", filteredProduct);
        
        // Set the filtered product (or an empty array if no match)
        setAllTemps1(filteredProduct.length > 0 ? filteredProduct[0] : null);
      } catch (error) {
        console.error("Error fetching the products:", error);
      }
    };
  
    fetchData();
  }, []); // Add 'search' as a dependency to re-fetch when it changes
  




  if (allTemp1) {
    imgs = allTemp1.img;
    brand = allTemp1.brand;
    box = allTemp1.box;
    cat = allTemp1.category;
    title = allTemp1.title;
    price = allTemp1.price;
    desc = allTemp1.description;
    colors = allTemp1.color;
    sizes = allTemp1.size;
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
  }, [cat]); // Runs only when `cat` changes and is defined


  useEffect(() => {
    if (box) { // Ensures `cat` is defined before running the effect
 setQuantity(box[0]);
    }
  }, [box]);


 

  const sv = -8.3333333;

  const handleClick = (idx) => {
    setTranslateXValue(idx * sv);
  };

  const handleClick1 = () => {
    var d2 = document.getElementById("specID");
    setIsActive1(!isActive1);
    if (d2) {
      if (isActive1) {
        d2.className += " DynamicAccordion_Tab--open";
        d2.classList.remove("DynamicAccordion_Tab--closed");
      } else {
        d2.className += " DynamicAccordion_Tab--closed";
        d2.classList.remove("DynamicAccordion_Tab--open");
      }
    }
  };

  const handleClick2 = () => {
    var d2 = document.getElementById("shipID");
    setIsActive2(!isActive2);
    if (d2) {
      if (isActive2) {
        d2.className += " DynamicAccordion_Tab--open";
        d2.classList.remove("DynamicAccordion_Tab--closed");
      } else {
        d2.className += " DynamicAccordion_Tab--closed";
        d2.classList.remove("DynamicAccordion_Tab--open");
      }
    }
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



  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      color: selectedColor,
      size: selectedSize,  
    };
    addToCart(allTemp1, quantity, data); // Pass the third parameter, allTemp1
    handleClickc(); // Custom function for further actions, if needed
  };

  const gotocart = () => {
    router.push('/checkout');
  };




  useEffect(() => {
    // Check localStorage for the code
    const storedCode = localStorage.getItem("accessCode");
    if (storedCode === "abcd12345") {
      setIsCodeValid(true);
    }
  }, []);

  const handleCodeSubmit = () => {
    if (code === "abcd12345") {
      localStorage.setItem("accessCode", code);
      setIsCodeValid(true);
    } else {
      alert("Invalid Code");
    }
  };

  const handleClickr = () => { 
    sessionStorage.setItem("imgg", imgg);
    router.push(`/prod.html`);
  };
 
  

  return (
    <>
 <Head>
        <meta property="og:title" content="Beauty Zone" />
        <meta property="og:url" content="https://abbasbaba.com/" />
        <meta property="og:site_name" content="At Beauty Zone, we're reshaping the way businesses connect." /> 
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
      </Head>
      <style
        dangerouslySetInnerHTML={{
          __html: "\n\n.uploadcare--widget__button, .uploadcare--widget__button:hover {\n\tpadding: 10px;\n\tbackground-color: #d7d7d7; \n  color: #212529;\n  width:100%;\n}\n\n.uploadcare--widget__button:hover {\n\tbackground-color: #c1c1c1;\n  \n}\n\n\n"
        }}
      />

      <div className="ProductDetailWrapper">
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
                                imgs.map((item) => (
                                  <div key={item._id}> {/* Assuming each item has a unique _id */}
                                    <div className="HtmlProductInfiniteGallery__Slides_Slide">
                                      <div className="Slide Slide--image">
                                        <div className="relative">


                                          <div className="relative br_w-full br_h-full br_flex br_justify-center br_items-center">
                                            {cat === "Hot Sale" && (
                                              <img
                                                src="https://res.cloudinary.com/drupytlml/image/upload/v1740521061/m5fzgzf1a4p6xn3bj1mn.png"
                                                alt="Hot Sale Badge"
                                                className="absolute    w-40 h-40 sm:w-40 sm:h-40"
                                                style={{ top: "-1em", left: "8em" }}
                                              />
                                            )}
                                            <img
                                              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 50vw"
                                              src={item?.replace('/upload/', '/upload/w_500/q_auto/f_auto/')}
                                            />
                                          </div>


                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className='container'>
                                  <h2 className='text-black text-xl dont-bold'>...</h2>
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
                              <img
                                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 50vw"
                                src={item?.replace('/upload/', '/upload/w_500/q_auto/f_auto/')}
                              />
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
                    <h1>
                      {title}
                      <span className="ProductSelector_EditionLabel" style={{ margin: "0 0 0 3px" }} />
                    </h1>
                    <p className='mb-2'>
                      Category: {cat}
                    </p>
                    <p className='mb-2'>
                      Brand: {brand}
                    </p> 
 
                  </span>
                  <div className="ApexPriceAndFreeShippingWrapper">








                    <div>
                      {!isCodeValid ? (
                        <div>
                        </div>
                      ) : (
                        <span className="ProvidersSingleProduct--selected">
                          <div className="br_flex">
                            <span className="price">
                              <span className="price_value" >${price}</span>
                            </span>
                          </div>
                        </span>
                      )}
                    </div>













                    <div>
                      <div className="FreeShippingMessage FreeShippingMessage--empty" />
                    </div>
                  </div>
                  <hr />
                  <div className="ProductSelector_IntroBlurb">
                    <span className="ProvidersIfSelectedProductMatchesFilter">
                      <p

                        dangerouslySetInnerHTML={{ __html: desc }}
                      /><br />
                    </span>
                  </div>
                  <div className="bagsFeaturesGrid__gridWrapper">
                    {isInCart ? (
                      <>
                        <p style={{ color: "#4acb4a", textAlign: "center", fontSize: "2em", fontWeight: "bolder" }}>It's In Cart!</p>
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
                        {!isCodeValid ? (
                          <div>
                            {imgs && imgs?.length > 0 ? (
                              <>
                                <a
                                  href={`https://wa.me/+96178850249?text=${imgs[0]}`}
                                  target="_blank"
                                  className="whatsapp-btn"
                                  style={{
                                    display: "block",
                                    textAlign: "center",
                                    padding: "10px",
                                    backgroundColor: "#25D366",
                                    color: "white",
                                    borderRadius: "5px",
                                    textDecoration: "none",
                                    marginBottom: "10px",
                                  }}
                                >
                                  GET PRICE NOW!
                                </a>
                                <input
                                  type="text"
                                  placeholder="Enter Code"
                                  value={code}
                                  onChange={(e) => setCode(e.target.value)}
                                  style={{ padding: "5px", marginRight: "5px" }}
                                />
                                <button onClick={handleCodeSubmit} style={{ padding: "5px 10px" }}>
                                  Submit
                                </button>
                              </>
                            ) : (
                              <div className='container'>
                                <h2 className='text-black text-xl dont-bold'>...</h2>
                              </div>
                            )}

                          </div>
                        ) : (
                          <form onSubmit={handleSubmit}>
                            <div className="">
                              <QuantitySelector initialQty={quantity} onChange={setQuantity} maxBoxes={box} />
                              <div className=""></div>




                              <div>
        <label className="block mb-2 font-semibold">Select Color:</label>
        <div className="flex gap-2">
          {colors?.map((color) => (
            <div
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-10 h-10 rounded-full border-2 cursor-pointer transition-all duration-150 ${
                selectedColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
              }`}
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <label className="block mb-2 font-semibold">Select Size:</label>
        <div className="flex gap-2">
          {sizes?.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`border px-4 py-2 rounded transition-all duration-150 ${
                selectedSize === size
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-black'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>











                              <div className="">
                                <span className="ProvidersSingleProduct--selected">
                                  <button type="submit" className="AddToCart HtmlProductAddToCart" style={{ borderRadius: "0" }}>
                                    <span>ADD TO CART</span>
                                  </button>
                                </span>
                              </div>
                              <div className=""></div>
                            </div>
                          </form>
                        )}
                      </div>
                    )}
                    <br />
                  </div>
                  <span className="ProvidersIfSelectedProductMatchesFilter">
                  </span>
                  <div className="DynamicAccordion" data-behaviour="tabs" id="dynamic_tabs_misc">

                    <div id='shipID' className="DynamicAccordion_Tab DynamicAccordion_Tab--closed">
                      <label className="DynamicAccordion_Tab_Header">
                        <input onClick={handleClick2} className="DynamicAccordion_Tab_Header_ToggleCheckbox" type="checkbox" />
                        Delivery and Returns
                      </label>
                      <div className="DynamicAccordion_Tab_Details">
                        <p>
                          We offer regular and express delivery to most addresses on Lebanon. Delivery cost are calculated at checkout.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <span className="ProvidersIfSelectedProductMatchesFilter">
                <content-block slug="product-page-wssb">
                  <style dangerouslySetInnerHTML={{
                    __html: ".bagsFeaturesGrid{margin:0 auto;padding:30px 5%;background:#111622}.bagsFeaturesGrid__gridWrapper{max-width:1150px;margin:0 auto}.bagsFeaturesGrid__title{-webkit-font-smoothing:antialiased;text-align:center;padding:0 0 25px;margin:0 auto;color:#fff}.bagsFeaturesGrid__feature{background:inherit;display:grid;grid-template-s:auto;align-items:center;padding:5px 0}.bagsFeaturesGrid__feature--text{-webkit-font-smoothing:antialiased;text-align:center;padding:15px 0 20px;grid-:2}.bagsFeaturesGrid__feature--text a{color:inherit}.bagsFeaturesGrid__feature--text h3{color:#fff;padding-bottom:10px}.bagsFeaturesGrid__feature--text p{color:#eee}.bagsFeaturesGrid__feature--image{position:relative;width:100%;min-height:62vw}@media (min-width: 811px){.bagsFeaturesGrid__feature--image{min-height:28vw}}@media (min-width: 1460px){.bagsFeaturesGrid__feature--image{min-height:409px}}.bagsFeaturesGrid__feature--image img{width:100%;display:block}.bagsFeaturesGrid__feature--image--logo{position:absolute;bottom:3.5%;right:8%;width:15vw}.bagsFeaturesGrid__feature--image--logo img{width:100%}.bagsFeaturesGrid__feature--text--logo{width:100px;padding-top:30px}.bagsFeaturesGrid__feature--text--logo img{width:100%}@media (min-width: 811px){.bagsFeaturesGrid{padding:75px 10%}.bagsFeaturesGrid__title{padding:0 0 60px}.bagsFeaturesGrid__feature{display:grid;grid-template-columns:1fr 1fr;grid-template-s:auto;padding:30px 0}.bagsFeaturesGrid__feature--image--logo{width:7vw}.bagsFeaturesGrid__feature .left{padding-right:15%}.bagsFeaturesGrid__feature .right{padding-left:15%}.bagsFeaturesGrid__feature--text{-webkit-font-smoothing:antialiased;text-align:left;padding:0;grid-:auto}}"
                  }} />
                  <style dangerouslySetInnerHTML={{
                    __html: ".ProductTile-SliderContainer--YMAL .ProductTile-SliderContainer-Title{height:auto;text-align:center;padding-bottom:10px}.ProductTile-SliderContainer--YMAL.ProductTile-SliderContainer{padding:40px 0 10px;background-color:#e9e9e9 ;display:flex;flex-direction:column;align-items:center}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev-ar,.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next-ar{height:25px;width:25px;border-top:2px solid #999;border-right:2px solid #999}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next-ar{transform:rotate(45deg);margin:0 15px 0 0}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev-ar{transform:rotate(225deg);margin:0 0 0 15px}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev,.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next{height:430px;width:80px;cursor:pointer;background-color:transparent;transition:opacity .3s ease;display:none;border:none;padding:0;appearance:none;-webkit-appearance:none}.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev[disabled],.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next[disabled]{opacity:0;pointer-events:none}@media (min-width: 700px){.ProductTile-SliderContainer--YMAL .ProductTile-Slider-prev,.ProductTile-SliderContainer--YMAL .ProductTile-Slider-next{display:flex;align-items:center;justify-content:center}}@media (min-width: 811px){.ProductTile-SliderContainer--YMAL .ProductTile-SliderContainer-Title{padding-bottom:30px}}.ProductTile-SliderContainer--YMAL .productRangeSlider{display:flex;align-items:center;max-width:1340px;width:100%;padding:5px;justify-content:space-between;margin:0 auto;min-height:145px}"
                  }} />
                  <div className="ProductTile-SliderContainer ProductTile-SliderContainer--YMAL" data-product-list-category="ymal-slider">
                    <div className="ProductTile-SliderContainer-Title br_text-3xl-serif br_text-[#333]">You might also like:</div>
                    {allTemp2 && allTemp2?.length > 0 ? (
                      <section style={{ maxWidth: "100%" }}>
                        <Swiper spaceBetween={50} loop modules={[Autoplay]} autoplay={{
                          delay: 2000,
                          stopOnLastSlide: false,
                          reverseDirection: true
                        }} breakpoints={{
                          150: {
                            slidesPerView: 1,
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
