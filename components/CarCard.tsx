"use client";

import { TempProps } from "../types";
import { motion } from "framer-motion";

interface CarCardProps {
    temp: TempProps;
}

const CarCard = ({ temp }: CarCardProps) => {
    const { _id, title, price, discount, img, category } = temp;

    return (
        <a href={`/product?id=${_id}`} >
            <div className="br_grid br_grid-cols-1 supports-subgrid:br_row-span-4 supports-subgrid:br_grid-rows-[subgrid]">
                <div className="Layout br_contents">
                    <center>
                        <span className="br_contents br_edition-">
                            <div className="">
                                <div className="initial:br_row-span-1 br_col-start-1 br_row-start-1 br_relative">
                                    <div className="br_aspect-[1/1] sm:br_aspect-square">
                                        <div className="br_w-full br_h-full br_relative br_flex br_items-center br_justify-center">
                                            <div className="w-[300px] h-[350px] relative rounded-[20px] overflow-hidden">
                                                {/* Default Image */}
                                                <motion.img
                                                    src={img[0]}
                                                    className="absolute w-full h-full object-cover"
                                                    style={{ borderRadius: "20px" }}
                                                    initial={{ opacity: 1 }}
                                                    whileHover={{ opacity: 0 }}
                                                    whileTap={{ opacity: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                />
                                                {/* Hover Image */}
                                                <motion.img
                                                    src={img[1]}
                                                    className="absolute w-full h-full object-cover"
                                                    style={{ borderRadius: "20px" }}
                                                    initial={{ opacity: 0 }}
                                                    whileHover={{ opacity: 1 }}
                                                    whileTap={{ opacity: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="ml-2 text-left initial:br_row-span-1 br_col-start-1 br_row-start-2 br_px-3 group-[.centered]/tile:br_justify-center group-[.centered]/tile:br_text-center">
                                    <h3 style={{ height: "100px" }} className="br_text-base-sans-spaced br_line-clamp-2 sm:br_line-clamp-none edition:br_text-grey-500 edition:br_hidden first:edition:br_inline edition:before:br_content-['_–_'] apex:edition:br_text-grey-300">
                                        <a
                                            href={`/product?id=${_id}`}
                                            className="br_text-current br_no-underline"
                                        >
                                            <h2 className="text-sm font-bold myBB  py-1">{title}</h2>
                                            <h2 className="text-sm font-bold myBB  py-1">{category}</h2>
                                            <div className="price-container br_inline-flex br_flex-wrap br_gap-x-2 br_items-baseline apex:br_text-white group-[.centered]/tile:br_justify-center">
                                                <span className="old-price text-left text-sm   py-1   br_line-through myBB">${price} USD</span>
                                                <span className="old-price text-left text-sm bg-gray-500 py-1 rounded br_text-gray-500 p-[4px]">${discount} USD</span>
                                            </div>


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
}

export default CarCard;
