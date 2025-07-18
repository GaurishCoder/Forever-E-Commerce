import React from "react";

function Subscribe() {
  return (
    <div className="w-full  flex flex-col items-center my-6 py-3 gap-10"> 
      <div className="section-1 flex flex-col justify-center items-center gap-3">
        <h3 className="text-gray-900 font-medium text-2xl">Subscribe now & get 20% off</h3>
        <p className="gray text-md">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div className="section-2  w-full flex items-center justify-center ">
        <input type="email" placeholder="Enter your email" className="px-2 sm:px-6 placeholder:gray py-[14px] w-2/5 border border-gray-400 border-r-none "/>
        <button className="px-10 py-[17px] bg-black text-white uppercase text-sm">Subscribe</button>
      </div>
    </div>
  );
}

export default Subscribe;
