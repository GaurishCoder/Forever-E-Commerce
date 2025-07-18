import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import Subscribe from "../components/Subscribe";

const Contact = () => {
  return (
    <div className=" my-3">
      <div className="text-content py-8  flex  items-start sm:items-center justify-center gap-2 ">
        <div className="text-1 flex items-center  justify-center   w-full gap-3  ">
          <div className="text-1-value text-2xl uppercase flex gap-2  items-center md:flex-row  font-medium text-[#414141]">
            <span className="text-gray-500 font-normal ">Contact</span> Us
          </div>
          <div className="line w-10 border text-black"></div>
        </div>
      </div>
      <section className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center sm:justify-center px-2 sm:px-10 ">
        <div className="w-full sm:w-[40%] ">
          <img
            src={assets.contact_img} // replace with your actual image path
            alt="About"
            className=" object-cover rounded"
          />
        </div>
        <div className="w-full sm:w-[20%] ">
          <div className="text-gray-700 ">
            <div>
              <h4 className="font-semibold text-xl">Our Store</h4>
              <div className="flex flex-col gap-7 mt-4">
                <div>
                  <p className="text-gray-500">54709 Willms Station</p>
                  <p className="text-gray-500">Suite 350, Washington, USA</p>
                </div>
                <div>
                  <p className="text-gray-500">Tel: (415) 555-0132</p>
                  <p className="text-gray-500">Email: admin@forever.com</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <h4 className="font-semibold">Careers at Forever</h4>
              <p>Learn more about our teams and job openings.</p>
              <button className="border w-[60%] border-black px-4 py-2 mt-2 hover:bg-black hover:text-white transition">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="my-20">
      <Subscribe/>
      </div>
    </div>
  );
};

export default Contact;
