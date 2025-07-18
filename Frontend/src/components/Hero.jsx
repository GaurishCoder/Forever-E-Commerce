import React from "react";
import { assets } from "../assets/frontend_assets/assets";

function Hero() {
  return (
    <div className="w-full flex flex-col sm:flex-row border border-gray-400">
      <div className="section-1 py-10 md:p-0  w-full md:w-1/2 flex flex-col items-center justify-center">
        <div className="text-content  flex flex-col items-start gap-3">
          <div className="text-1 flex items-center gap-3">
            <div className="line w-10 border text-black"></div>
            <div className="text-1-value uppercase font-medium text-[#414141]">
              Our Bestsellers
            </div>
          </div>
          <div className="text-2">
            <h3 className="text-3xl sm:text-4xl md:text-5xl prata-font text-[#414141] ">
              Latest Arrivals
            </h3>
          </div>
          <div className="text-3 flex items-center justify-center   gap-3">
            <div className="text-1-value uppercase font-semibold text-[#414141]">
              Shop now
            </div>
            <div className="line w-10 border text-black"></div>
          </div>
        </div>
      </div>
      <div className="section-2 w-full md:w-1/2">
        <img src={assets.hero_img} className="w-full object-cover" alt="" />
      </div>
    </div>
  );
}

export default Hero;
