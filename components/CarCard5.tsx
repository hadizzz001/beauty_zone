"use client";

import { useState } from "react";
import { TempProps } from "../types"; 

interface CarCardProps {
    temp: TempProps;
}

const CarCard5 = ({ temp }: CarCardProps) => {
    const { _id, title, price, discount, img, category } = temp;
    const [isTouched, setIsTouched] = useState(false);

    const handleTouchStart = () => {
        setIsTouched(true);
    };

    const handleTouchEnd = () => {
        setTimeout(() => setIsTouched(false), 2000); // Reset after 2s
    };

    return (
        <a href={`/product?id=${_id}`}>
            <div className="br_grid br_grid-cols-1 supports-subgrid:br_row-span-4 supports-subgrid:br_grid-rows-[subgrid]">
                <div className="Layout br_contents">
                    <center>
                        <span className="br_contents br_edition-">
                            <div className="">
                                <div className="initial:br_row-span-1 br_col-start-1 br_row-start-1 br_relative">
                                    <div className="br_aspect-[1/1] sm:br_aspect-square">
                                        <div 
                                            className={`br_w-full br_h-full br_relative br_flex br_items-center br_justify-center image-container ${isTouched ? "touch-active" : ""}`} 
                                            onTouchStart={handleTouchStart} 
                                            onTouchEnd={handleTouchEnd}
                                        >
                                            {/* Default Image */}
                                            <img
                                                src={img[0]}
                                                alt="Default"
                                                className="default-img"
                                                style={{
                                                    borderRadius: "20px", 
                                                    height: "150px",
                                                    objectFit: "cover"
                                                }}
                                            />

                                       
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-2 text-left initial:br_row-span-1 br_col-start-1 br_row-start-2 br_px-3 group-[.centered]/tile:br_justify-center group-[.centered]/tile:br_text-center">
                                    <h3 style={{ height: "100px" }} className="br_text-base-sans-spaced br_line-clamp-2 sm:br_line-clamp-none edition:br_text-grey-500 edition:br_hidden first:edition:br_inline edition:before:br_content-['_–_'] apex:edition:br_text-grey-300">
                                        <a href={`/product?id=${_id}`} className="br_text-current br_no-underline">
                                            <h2 className="text-sm font-bold myBB py-1">{title}</h2> 
                                            {price && (<span className="old-price text-left text-sm py-1 br_line-through myBB">${price} USD</span>)}
                                            <span className="old-price text-left text-sm bg-gray-500 py-1 rounded br_text-gray-500 ml-2">${discount} USD</span>
                                        </a>
                                    </h3>
                                </div>
                            </div>
                        </span>
                    </center>
                </div>
            </div>
        </a>
    );
};

export default CarCard5;
