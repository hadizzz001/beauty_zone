"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";




const Body = () => {
  const [allTemp, setTemp] = useState()
  const [isActive1, setIsActive1] = useState(true);
  const [checkboxesData, setCheckboxesData] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]); // Store selected category IDs
  const [touchedIndex, setTouchedIndex] = useState(null); // Track which image is touched

  const handleTouchStart = (index) => {
    setTouchedIndex(index);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setTouchedIndex(null), 2000); // Reset after 2s
  };






  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");
        const data = await response.json();
        setCheckboxesData(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);











  const handleClick1 = () => {
    var d2 = document.getElementById("filterId1");
    setIsActive1(!isActive1);
    if (d2) {
      if (isActive1) {
        d2.className += " br_-translate-y-full br_opacity-100";
        d2.classList.remove("br_translate-y-0");
        d2.classList.remove("br_opacity-0");
      }
    }
  };



  const handleClick2 = () => {
    var d3 = document.getElementById("filterId1");
    setIsActive1(!isActive1);
    if (d3) {
      if (!isActive1) {
        d3.className += " br_translate-y-0 br_opacity-0";
        d3.classList.remove("br_-translate-y-full");
        d3.classList.remove("br_opacity-100");
      }
    }
  };





  useEffect(() => {
    fetchCategories();
    fetchProducts(); // Fetch all products initially
  }, []);

  useEffect(() => {
    fetchProducts(); // Re-fetch products when selected categories change
  }, [checkedCategories]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category");
      const data = await response.json();
      setCheckboxesData(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    let url = "/api/products"; // Default: fetch all products
    if (checkedCategories.length > 0) {
      url = `/api/products2/${checkedCategories.join(",")}`;
    }

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTemp(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCheckboxChange = (categoryId) => {
    setCheckedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId) // Uncheck
        : [...prev, categoryId] // Check
    );
  };




  return (


    <>











      <div className="br_min-h-screen br_relative md:mt-20 mt-5">

  
        <div className="br_flex">
          <div id='filterId1' className="br_text-grey-500 br_fixed br_top-full br_h-full br_bottom-0 br_left-0 br_right-0    br_mt-0 br_flex br_flex-col br_justify-between br_transition-opacity br_duration-300 md:br_mt-14 md:br_flex-[0_0_280px]    br_translate-y-0 br_opacity-0 md:br_opacity-100 md:br_block md:br_relative md:br_h-auto md:br_transform-none">
            <div className="br_items-center md:br_hidden br_grid br_px-4 br_grid-cols-[repeat(3,1fr)] br_border-solid br_border-0 br_border-b br_border-grey-300">

              <div className="br_text-base-sans-bold-stretched br_tracking-cta br_text-white br_my-4 br_py-2 br_px-0 br_border-none br_bg-transparent"></div>
              <h3 className="br_text-2xl-serif br_text-center myNewC">Filters</h3>
              <button onClick={handleClick2} className="br_flex br_justify-end br_border-none br_bg-transparent br_cursor-pointer br_p-0 myNewC"  >
                <span className="br_w-6 br_h-6 br_rotate-45">
                  <svg
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                    className="br_fill-none br_stroke-current br_w-full br_h-full"
                  >
                    <path strokeLinecap="square" d="M0 7 14 7M7 0 7 14" />
                  </svg>
                </span>
              </button>
            </div>





            <div className="br_overflow-y-auto br_flex-grow br_pb-3">
              <details className="br_pl-4 md:br_pl-8 br_pr-4">
                <summary className="br_list-none br_cursor-pointer [&::-webkit-details-marker]:br_hidden [&::marker]:br_hidden">
                  <h3 className="br_border-solid br_border-0 br_border-b br_border-grey-300 br_text-gray br_text-base-sans-bold-stretched br_pb-2 br_flex br_justify-between br_items-end br_pt-4 myNewC">
                    Category
                    <div className="br_w-3 [details[open]_&]:br_rotate-180 br_transition-transform br_duration-200">
                      <svg
                        viewBox="0 0 11 6"
                        width={11}
                        height={6}
                        className="br_stroke-none br_fill-current br_w-full br_h-full myBB"
                      >
                        <path
                          className="st0"
                          d="M5.4,4.4l4.5-4.2c0.2-0.3,0.7-0.3,0.9,0c0,0,0,0,0,0c0.3,0.3,0.3,0.7,0,1c0,0,0,0,0,0L5.9,5.8 C5.6,6.1,5.2,6.1,5,5.8L0.2,1.1c-0.3-0.3-0.3-0.7,0-0.9C0.4,0,0.8,0,1.1,0.2c0,0,0,0,0,0L5.4,4.4z"
                        />
                      </svg>
                    </div>
                  </h3>
                </summary>
                <div className="br_my-2 md:br_my-4 md:br_h-full br_w-full br_gap-x-5 br_columns-2 md:br_columns-1">
                  {checkboxesData.map((category) => (
                    <div
                      key={category.id}
                      className="br_block br_relative br_max-w-full br_w-full br_py-2 br_break-inside-avoid md:br_inline-block md:br_overflow-hidden md:br_m-0 md:br_p-0"
                      title={category.name}
                    >
                      <label className="br_flex br_gap-4 br_cursor-pointer br_text-gray br_text-base-sans-spaced br_py-1 md:br_py-2 myNewC">
                        <input
                          className="br_absolute br_h-0 br_w-0 br_opacity-0"
                          type="checkbox"
                          checked={checkedCategories.includes(category.name)}
                          onChange={() => handleCheckboxChange(category.name)}
                        />
                        <span className="br_shrink-0 br_relative br_h-[22px] br_w-[22px] br_border-[#222] br_border-solid br_border br_rounded md:br_h-[18px] md:br_w-[18px]">
                          <span className="br_h-full br_w-full br_text-white">
                            <img
                              src={
                                checkedCategories.includes(category.name)
                                  ? "https://res.cloudinary.com/duppvjinz/image/upload/v1701685867/eprldb0uad9klcw2ki5z.png" // Checked
                                  : "https://res.cloudinary.com/duppvjinz/image/upload/v1701541407/jhvrodq8u9e8vjlwe964.png" // Unchecked
                              }
                              alt=""
                            />
                          </span>
                        </span>
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </details>


            </div>












          </div>





          <div className="br_flex-1" onClick={handleClick1}>
            <div className="br_flex br_justify-between br_items-center br_gap-4 br_mb-2 br_px-4 br_my-4 md:br_justify-end">
              <div className="br_flex br_gap-4 br_items-center md:br_hidden">
                <button className="br_leading-5 br_text-base-sans-bold-stretched br_px-4 br_py-2 br_rounded br_border br_border-solid br_flex br_gap-2 br_justify-center br_items-center br_whitespace-nowrap br_bg-transparent br_text-white br_border-grey-300 myBB">
                  <svg width={16} height={14}>
                    <g fill="currentColor" fillRule="nonzero">
                      <path d="M4.699 0c-.94 0-1.739.588-1.997 1.395H.564A.541.541 0 000 1.939c0 .305.258.545.587.545h2.138C2.96 3.29 3.783 3.88 4.722 3.88c.964 0 1.763-.589 2.021-1.395h8.67c.329 0 .587-.24.587-.545 0-.305-.258-.544-.587-.544h-8.67C6.461.588 5.663 0 4.699 0zm.023 1.09c.494 0 .917.37.917.85 0 .479-.423.85-.917.85-.493 0-.916-.371-.916-.85 0-.48.423-.85.916-.85z" />
                      <path d="M11.77 4.848c-.939 0-1.738.589-1.996 1.395H.587c-.352 0-.587.24-.587.545 0 .305.258.545.587.545h9.187c.235.806 1.057 1.394 1.997 1.394.963 0 1.762-.588 2.02-1.394h1.622c.329 0 .587-.24.587-.545 0-.305-.258-.545-.587-.545H13.79c-.258-.806-1.057-1.395-2.02-1.395zm.024 1.09c.494 0 .917.37.917.85s-.423.85-.917.85c-.493 0-.916-.37-.916-.85s.4-.85.916-.85z" />
                      <path d="M7.518 9.697c-.94 0-1.738.588-1.997 1.395H.587c-.352 0-.587.24-.587.544 0 .305.258.545.587.545h4.958c.235.806 1.057 1.395 1.997 1.395.963 0 1.762-.589 2.02-1.395h5.85c.33 0 .588-.24.588-.545 0-.305-.258-.544-.587-.544H9.539c-.259-.807-1.057-1.395-2.02-1.395zm.024 1.09c.493 0 .916.37.916.85 0 .479-.423.85-.916.85-.494 0-.916-.371-.916-.85a.902.902 0 01.916-.85z" />
                    </g>
                  </svg>
                  Filters
                </button>
              </div>
            </div>




            <div className="br_@container">
              <div
                className="br_group/tile-grid br_grid br_grid-flow-dense br_gap-1 br_py-1 br_grid-cols-2 sm:br_grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:br_px-1 lg:br_grid-cols-[repeat(auto-fill,minmax(285px,1fr))] supports-[container-type]:sm:br_grid-cols-2 supports-[container-type]:sm:@[640px]:br_grid-cols-[repeat(auto-fill,minmax(250px,1fr))] supports-[container-type]:lg:@[1024px]:br_grid-cols-[repeat(auto-fill,minmax(285px,1fr))]"

              >








                {allTemp && allTemp.length > 0 ? (
                  allTemp.map((item, index) => (
                    <div
                      key={item._id}
                      className="br_grid br_grid-cols-1 supports-subgrid:br_row-span-4 supports-subgrid:br_grid-rows-[subgrid]"
                    >
                      <div
                        className={`image-container ${touchedIndex === index ? "touch-active" : ""
                          }`}
                        onTouchStart={() => handleTouchStart(index)}
                        onTouchEnd={handleTouchEnd}
                      >
                        {/* Default Image */}
                        <img className="default-img" src={item.img[0]} alt="Default" />


                      </div>

                      <div className="Layout br_contents">
                        <span className="br_contents br_edition-">
                          <div className="br_grid br_grid-cols-1 br_grid-rows-[auto_auto_1fr_auto] supports-subgrid:br_row-span-4 supports-subgrid:br_grid-rows-[subgrid] initial:br_text-white apex:br_bg-[#222] apex:br_text-white br_gap-2 br_pb-3 br_group/tile br_relative">
                            <div
                              style={{ textAlign: "center" }}
                              className="initial:br_row-span-1 br_col-start-1 br_row-start-2 br_px-3 group-[.centered]/tile:br_justify-center group-[.centered]/tile:br_text-center"
                            >
                              <h3 className="myNewC br_text-base-sans-spaced br_line-clamp-2 sm:br_line-clamp-none edition:br_text-grey-500 edition:br_hidden first:edition:br_inline edition:before:br_content-['_–_'] apex:edition:br_text-grey-300">
                                <a
                                  href={`/product?id=${item._id}&&imgg=${item.img[0]}`}
                                  className="br_text-current br_no-underline"
                                  id="anchorNew"
                                >
                                  {item.title}
                                  <br />
                                  {item.category}
                                  <span
                                    className="br_absolute br_inset-0 br_z-10"
                                    aria-hidden="true"
                                  />
                                </a>
                              </h3>
                              <div className="price-container br_inline-flex br_flex-wrap br_gap-x-2 br_items-baseline apex:br_text-white group-[.centered]/tile:br_justify-center">
                                <span className="old-price br_text-gray-500 br_line-through myBB">
                                  ${item.price}
                                </span>
                                <span className="new-price myBB">${item.discount}</span>
                              </div>
                              <br />
                            </div>
                          </div>
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="home___error-container">
                    <h2 className="text-black text-xl dont-bold">...</h2>
                  </div>
                )}















              </div>
            </div>
          </div>
        </div>
      </div>


      <div>

      </div>








    </>








  )
}

export default Body