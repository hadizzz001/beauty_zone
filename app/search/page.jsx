"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'



const Body = () => {
  const searchParams = useSearchParams()
  const [allTemp, setTemp] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Search query parameters from URL
  const search = searchParams.get('q');
  const search2 = searchParams.get('cat');
  const search3 = searchParams.get('sub');
  const search4 = searchParams.get('brnd');





const fetchProducts = async (pageNum = 1) => {
  try {
    const params = new URLSearchParams();
    params.append('page', pageNum);
    params.append('limit', 10); // or any number you want

    if (search) params.append('q', search);
    if (search2) params.append('cat', search2);
    if (search3) params.append('sub', search3);
    if (search4) params.append('brnd', search4);

    const res = await fetch(`/api/productsz1?${params.toString()}`);
    const data = await res.json();

    // Sort products by the "sort" attribute
    const sortedProducts = (data.products || []).sort((a, b) => a.sort - b.sort);

    setTemp(sortedProducts);
    setTotalPages(data.totalPages || 1);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};



  useEffect(() => {
    fetchProducts(page);
  }, [search, search2, search3, search4, page]);


  const handleNextPage = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };




  return (


    <>


      <div className="br_min-h-screen br_relative mt-5">
        <div className="br_flex">
          <div className="br_flex-1">
            <div className="br_@container">
              <div
                className="br_group/tile-grid br_grid br_grid-flow-dense br_gap-1 br_py-1 br_grid-cols-2 sm:br_grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:br_px-1 lg:br_grid-cols-[repeat(auto-fill,minmax(285px,1fr))] supports-[container-type]:sm:br_grid-cols-2 supports-[container-type]:sm:@[640px]:br_grid-cols-[repeat(auto-fill,minmax(250px,1fr))] supports-[container-type]:lg:@[1024px]:br_grid-cols-[repeat(auto-fill,minmax(285px,1fr))]"

              >








                {allTemp && allTemp?.length > 0 ? (
                  allTemp.map((item, index) => (
                    <div
                      key={item._id}
                      className="br_grid br_grid-cols-1 supports-subgrid:br_row-span-4 supports-subgrid:br_grid-rows-[subgrid]"
                    >
                      <img className="default-img" src={item.img?.[0]?.replace('/upload/', '/upload/w_500/q_70/f_auto/') || ''} alt="Default" />

                      <div className="Layout br_contents">
                        <span className="br_contents br_edition-">
                          <div className="br_grid br_grid-cols-1 br_grid-rows-[auto_auto_1fr_auto] supports-subgrid:br_row-span-4 supports-subgrid:br_grid-rows-[subgrid] initial:br_text-white apex:br_bg-[#4e4e4e] apex:br_text-white br_gap-2 br_pb-3 br_group/tile br_relative">
                            <div
                              style={{ textAlign: "center" }}
                              className="initial:br_row-span-1 br_col-start-1 br_row-start-2 br_px-3 group-[.centered]/tile:br_justify-center group-[.centered]/tile:br_text-center"
                            >
                              <h3 className="myNewC br_text-base-sans-spaced br_line-clamp-2 sm:br_line-clamp-none edition:br_text-grey-500 edition:br_hidden first:edition:br_inline edition:before:br_content-['_–_'] apex:edition:br_text-grey-300">
                                <a
                                  href={`/product?id=${item._id}`}
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

                                  {item.price && ('$' + item.price)}
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
              <div className="mt-4 mb-4 flex justify-center items-center space-x-4">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded disabled:opacity-50 myGray1 text-3xl"
                  style={{ color: '#999' }}
                >
                  &#8592;
                </button>

                <span
                  className="flex items-center justify-center text-white text-[11px]"
                  style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: '#5bbccd',
                    borderRadius: '50%',
                  }}
                >
                  {page}
                </span>

                <button
                  onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded disabled:opacity-50 myGray1 text-3xl"
                  style={{ color: '#999' }}
                >
                  &#8594;
                </button>
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