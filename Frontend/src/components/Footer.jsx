import React from "react";
import { assets } from "../assets/frontend_assets/assets";

function Footer() {
  return (
    <div className="w-full mt-8">
      <div className="section1 py-10 w-full flex flex-col sm:flex-row justify-between gap-10 sm:gap-1 break-all">
        <div className="box1 flex flex-col items-start gap-5">
          <div className="img">
            <img src={assets.logo} className="w-35" alt="" />
          </div>
          <div className="text max-w-[35rem]  gray text-sm break-all">
           Built on quality and trust, we aim to deliver products that make everyday living better.From careful sourcing to thoughtful design, each step is taken with our customers in mind. We are proud to be a brand that values reliability, comfort, and long-term satisfaction.
          </div>
        </div>
        <div className="box2 flex flex-col items-start gap-5">
          <h3 className="text-gray-900 text-xl font-semibold">COMPANY</h3>

          <ul className="flex flex-col gap-1 text-sm gray">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="box3 flex flex-col items-start gap-5">
          <h3 className="text-gray-900 text-xl font-semibold">GET IN TOUCH</h3>
          <ul className="flex flex-col gray">
            <li>+1-000-000-0000</li>
            <li>gaurish@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="section2 w-full  text-center pt-4 border-t border-gray-300">
        <p>Copyright 2025@ gaurish.dev - All Right Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
