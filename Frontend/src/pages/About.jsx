import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import Subscribe from "../components/Subscribe";

const About = () => {
  return (
    <div className=" mt-5">
      <div className="text-content py-6 sm:py-8  flex   items-center justify-center gap-2 ">
        <div className="text-1 flex items-center  justify-center   w-full gap-3  ">
          <div className="text-1-value text-2xl uppercase flex gap-2  items-center md:flex-row  font-medium text-[#414141]">
            <span className="text-gray-500 font-normal ">About</span> Us
          </div>
          <div className="line w-10 border text-black"></div>
        </div>
      </div>
      {/* About Us Section */}
      <section className="flex flex-col sm:flex-row sm:items-start gap-10 mb-16 ">
        <div className="w-full sm:w-[40%] ">
          <img
            src={assets.about_img} // replace with your actual image path
            alt="About"
            className=" object-cover rounded"
          />
        </div>

        <div className="w-full sm:w-[60%] mt-10">
          <p className="mb-10 text-gray-700">
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p className="text-gray-700 mb-4">
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <h3 className="font-semibold my-6">Our Mission</h3>
          <p className="text-gray-700">
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section>
        <div className="text-content sm:py-8  flex   items-center justify-center gap-2 ">
          <div className="text-1 flex items-center  justify-start   w-full gap-3  ">
            <div className="text-1-value text-2xl uppercase flex gap-2  items-center md:flex-row  font-medium text-[#414141]">
              <span className="text-gray-500 font-normal ">Why </span> Choose us
            </div>
            <div className="line w-10 border text-black"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 mt-6">
          <div className="border p-10 sm:p-15 border-gray-200">
            <h4 className="font-semibold text-md mb-2">Quality Assurance:</h4>
            <p className="text-gray-700 text-sm">
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </p>
          </div>
          <div className="border p-10 sm:p-15 border-gray-200">
            <h4 className="font-semibold text-md mb-2">Convenience:</h4>
            <p className="text-gray-700 text-sm">
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>
          <div className="border p-10 sm:p-15 border-gray-200">
            <h4 className="font-semibold text-smmdb-2">
              Exceptional Customer Servic text-sme:
            </h4>
            <p className="text-gray-700">
              Our team of dedicated professionals is here to assist you the way,
              ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </section>

      
      <div className="my-20">
        <Subscribe />
      </div>
    </div>
  );
};

export default About;
