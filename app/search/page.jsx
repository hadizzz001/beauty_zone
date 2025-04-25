"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'



const Body = () => {
    const [allTemp, setTemp] = useState()
    const searchParams = useSearchParams()
    const search = searchParams.get('q')
    const search2 = searchParams.get('cat')
    const search3 = searchParams.get('sub')
    const search4 = searchParams.get('brnd')
    const [touchedIndex, setTouchedIndex] = useState(null); // Track which image is touched

    const handleTouchStart = (index) => {
      setTouchedIndex(index);
    };
  
    const handleTouchEnd = () => {
      setTimeout(() => setTouchedIndex(null), 2000); // Reset after 2s
    };
  
    

  
   








    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch all products first
                const response = await fetch('/api/products');
                const data = await response.json();

                // Filter data based on search criteria
                let filteredData = data;

                // Filter by search2 (arrival="yes")
                if(search2){
                    if (search2 === 'yes') {
                        filteredData = filteredData.filter(item => item.arrival === 'yes');
                    }
                    else{ 
                        filteredData = filteredData.filter(item => item.category.toLowerCase() === search2.toLowerCase());
                    }
                }




                // Filter by search (title contains)
                if (search) {
                    filteredData = filteredData.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
                }

                // Filter by search3 (subcategory)
                if (search3) {
                    filteredData = filteredData.filter(item => item.subcategory && item.subcategory.toLowerCase() === search3.toLowerCase());
                }
                if (search4) {
                    filteredData = filteredData.filter(item => item.brand && item.brand.toLowerCase() === search4.toLowerCase());
                }

                // Set the filtered data to state
                setTemp(filteredData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [ ]); // Add dependencies to trigger fetch on any search change




console.log(search2);

console.log("allTemp ", allTemp);





    return (


        <>











            <div className="br_min-h-screen br_relative mt-5">

        
                <div className="br_flex">






                    <div className="br_flex-1">





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
              className={`image-container ${
                touchedIndex === index ? "touch-active" : ""
              }`}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={handleTouchEnd}
            >
              {/* Default Image */}
              <img className="default-img" src={item.img[0]} alt="Default" />

              
            </div>

            <div className="Layout br_contents">
              <span className="br_contents br_edition-">
                <div className="br_grid br_grid-cols-1 br_grid-rows-[auto_auto_1fr_auto] supports-subgrid:br_row-span-4 supports-subgrid:br_grid-rows-[subgrid] initial:br_text-white apex:br_bg-[#4e4e4e] apex:br_text-white br_gap-2 br_pb-3 br_group/tile br_relative">
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
          <h2 className="text-black text-xl dont-bold">Nothing Found</h2>
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