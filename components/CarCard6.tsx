"use client";

import Image from "next/image";
import { TempProps2 } from "../types";
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';

interface CarCardProps {
    temp: TempProps2;
}

const CarCard6 = ({ temp }: CarCardProps) => {
    const { _id, name, img } = temp;

    return (
        <a href={`/search?subcat=${name}`} >
            <div className="br_grid br_grid-cols-1 supports-subgrid:br_row-span-4 supports-subgrid:br_grid-rows-[subgrid]">
                <div className="Layout br_contents">
                    <center>
                        <span className="br_contents br_edition-">
                            <div className="">
                                <div className="initial:br_row-span-1 br_col-start-1 br_row-start-1 br_relative">
                                    <div className="br_aspect-[1/1] sm:br_aspect-square">
                                        <div className="br_w-full br_h-full br_relative br_flex br_items-center br_justify-center">
                                            <img
                                                src={img[0]}
                                                style={{
                                                    borderRadius: '20px',
                                                    width: '300px',
                                                    height: '350px',
                                                    objectFit: 'cover'
                                                }}
                                            />

                                        </div>
                                    </div>
                                </div>
                                <div className="ml-2 text-left initial:br_row-span-1 br_col-start-1 br_row-start-2 br_px-3 group-[.centered]/tile:br_justify-center group-[.centered]/tile:br_text-center">
                                    <h3 style={{ height: "100px" }} className="br_text-base-sans-spaced br_line-clamp-2 sm:br_line-clamp-none edition:br_text-grey-500 edition:br_hidden first:edition:br_inline edition:before:br_content-['_–_'] apex:edition:br_text-grey-300">
                                        <a
                                            href={`/search?subcat=${name}`}
                                            className="br_text-current br_no-underline"
                                        >
                                            <h2 className="text-sm font-bold myBB  py-1">{name}</h2> 

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

export default CarCard6;
