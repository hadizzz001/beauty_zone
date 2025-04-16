"use client";

import Image from "next/image";
import { TempProps2 } from "../types";
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';

interface CarCardProps {
    temp: TempProps2;
}



const CarCard = ({ temp }: CarCardProps) => {
    const { _id, name, img } = temp; 

    return (

        <div className="br_grid br_grid-cols-1 supports-subgrid:br_row-span-4 supports-subgrid:br_grid-rows-[subgrid]" >
            <div className="Layout br_contents">

                <center>
                    <span className="br_contents br_edition-">
                        <div className="">
                            <div className="initial:br_row-span-1 br_col-start-1 br_row-start-1 br_relative">
                                <div className="br_aspect-[1/1] sm:br_aspect-square">
                                    <div className="br_w-full br_h-full br_relative br_flex br_items-center br_justify-center">
                                    <img
  className="rounded-full"
  alt="Slim Sleeve - Cocoa-Java"
  loading="lazy"
  src={"" + img[0]}
  width={350}
/>

                                    </div>
                                </div>
                            </div>
                            <div className="initial:br_row-span-1 br_col-start-1 br_row-start-2 br_px-3 group-[.centered]/tile:br_justify-center group-[.centered]/tile:br_text-center">
                                <h3 style={{ height: "100px" }} className="br_text-base-sans-spaced br_line-clamp-2 sm:br_line-clamp-none edition:br_text-white edition:br_hidden first:edition:br_inline edition:before:br_content-['_–_'] apex:edition:br_text-white">
                                    <a
                                        href={`/search?cat=${name}`}
                                        className="br_text-current br_no-underline"
                                    >
                                        <h2>{name}</h2><br /> 
                                        <span
                                            className="br_absolute br_inset-0 br_z-10"
                                        />
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </span>
                </center>
            </div>
        </div>
    )
}

export default CarCard