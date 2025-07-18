import React from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

function Sidebar() {
  return (
    <div className="w-[18%] min-h-screen border-r border-gray-300">
      <div className=" flex flex-col justify-end w-full relative items-end py-6 gap-4">
        <div className="content-1 w-[80%] relative   ">
          <NavLink
            to="/add"
            className={({ isActive }) =>
              `flex items-center w-full border border-gray-300 px-3 gap-3 rounded-r-none rounded-sm border-r-transparent py-2 ${isActive ? "bg-[#FFEBF5] border-pink-900" : "bg-transparent"}`
            }
          >
            <div className="img">
              <img src={assets.add_icon} className="w-5" alt="" />
            </div>
            <div className="text text-md hidden md:block">Add Items</div>
          </NavLink>
        </div>
        <div className="content-1 w-[80%] relative   ">
          <NavLink
            to={"/list"}
           className={({ isActive }) =>
              `flex items-center w-full border border-gray-300 px-3 gap-3 rounded-r-none rounded-sm border-r-transparent py-2 ${isActive ? "bg-[#FFEBF5] border-pink-900" : "bg-transparent"}`
            }
          >
            <div className="img">
              <img src={assets.order_icon} className="w-5" alt="" />
            </div>
            <div className="text text-md hidden md:block">List Items</div>
          </NavLink>
        </div>
        <div className="content-1 w-[80%] relative   ">
          <NavLink
            to={"/orders"}
            className={({ isActive }) =>
              `flex items-center w-full border border-gray-300 px-3 gap-3 rounded-r-none rounded-sm border-r-transparent py-2 ${isActive ? "bg-[#FFEBF5] border-pink-900" : "bg-transparent"}`
            }
          >
            <div className="img">
              <img src={assets.order_icon} className="w-5" alt="" />
            </div>
            <div className="text text-md hidden md:block">Orders</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
