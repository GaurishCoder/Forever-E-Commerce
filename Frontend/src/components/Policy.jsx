import React from "react";
import { assets, products } from "../assets/frontend_assets/assets";

function Policy() {
  return (
    <div className="w-full my-3 sm:my-10  flex flex-col sm:flex-row md:justify-between px-10 sm:px-22 py-10 gap-20 items-center">
      <div className="content-container  w-fit flex flex-col items-center gap-3">
        <div className="img">
          <img src={assets.exchange_icon} className="w-13 " alt="" />
        </div>
        <div className="content-dis flex flex-col items-center justify-center">
          <p className="text-gray-900 font-medium">Easy Exchange Policy</p>
          <p className="gray">We offer hassle free exchange policy </p>
        </div>
      </div>
      <div className="content-container  w-fit flex flex-col items-center gap-3">
        <div className="img">
          <img src={assets.quality_icon} className="w-13 " alt="" />
        </div>
        <div className="content-dis flex flex-col items-center justify-center">
          <p className="text-gray-900 font-medium">Easy Exchange Policy</p>
          <p className="gray">We offer hassle free exchange policy </p>
        </div>
      </div>
      <div className="content-container  w-fit flex flex-col items-center gap-3">
        <div className="img">
          <img src={assets.support_img} className="w-10 " alt="" />
        </div>
        <div className="content-dis flex flex-col items-center justify-center">
          <p className="text-gray-900 font-medium">Easy Exchange Policy</p>
          <p className="gray">We offer hassle free exchange policy </p>
        </div>
      </div>
    </div>
  );
}

export default Policy;
