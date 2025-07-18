import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingContext } from "../context/ShoppingStore.jsx";
import { useEffect } from "react";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const {
    cartCount,
    setShowSearch,
    token,
    handleLogout,
    username,
    setUsername,
  } = useContext(ShoppingContext);
  const handleMenu = () => {
    setShowMenu(true);
  };
  const handleMenuBack = () => {
    setShowMenu(false);
  };

  const handleDropdown = () => {
    if(!token){
      setDropdown(false);
      return null;
    }
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  useEffect(() => {
    if (token) {
      setUsername(username);
    }
  }, [token]);

  return (
    <nav className="w-full flex items-center justify-between relative py-2 pb-4 border-b border-gray-300">
      <div className="logo">
        <NavLink to="/">
          <img src={`${assets.logo}`} alt="Forever-Logo" className="w-35" />
        </NavLink>
      </div>
      {/* nav-items in large screen */}
      <div className="nav-items sm:block hidden">
        <ul className="flex items-center justify-center gap-7">
          <li className="uppercase text-sm">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li className="uppercase text-sm">
            <NavLink
              to="/collection"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Collection
            </NavLink>
          </li>

          <li className="uppercase text-sm">
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About
            </NavLink>
          </li>
          <li className="uppercase text-sm">
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="icons flex items-center justify-center gap-6">
        <div className="search" onClick={() => setShowSearch(true)}>
          <Link to="/collection ">
            <img src={`${assets.search_icon}`} className="w-5" alt="" />
          </Link>
        </div>
        <div className="profile relative">
          <Link to={token ? "/" : "/login"}>
            <img
              onClick={handleDropdown}
              src={`${assets.profile_icon}`}
              className="w-5"
              alt=""
            />
          </Link>
          {token ? (
            <div
              className={`${`dropdown-menu ${
                dropdown ? "flex" : "hidden"
              } flex-col gap-2 bg-gray-100 px-6 py-1 absolute -right-9 rounded-sm  top-11`}`}
            >
              <div className="w-6 h-6 rotate-[50deg] bg-gray-100 -z-30 absolute -top-2 left-11"></div>
              <Link to={"/"} onClick={() => setDropdown(false)}>
                <p className="text-md text-gray-600 hover:text-gray-800 hover:font-medium ">
                  {username.split(" ")[0]}
                </p>
              </Link>
              <Link to={"/orders"} onClick={() => setDropdown(false)}>
                <p className="text-md text-gray-600 hover:text-gray-800 hover:font-medium ">
                  Orders
                </p>
              </Link>
              <Link>
                <p
                  className="text-md text-gray-600 hover:text-gray-800 hover:font-medium "
                  onClick={() => {
                    setDropdown(false);
                    handleLogout();
                  }}
                >
                  Logout
                </p>
              </Link>
            </div>
          ) : null}
        </div>
        <div className="cart relative">
          <Link to="/cart">
            <img src={`${assets.cart_icon}`} className="w-5" alt="" />
            <div className="cart-value absolute top-3 -right-1 w-4 h-4 flex items-center justify-center bg-black text-white rounded-full text-[10px]">
              {cartCount}
            </div>
          </Link>
        </div>
        <div className="menu block sm:hidden  " onClick={handleMenu}>
          <img src={`${assets.menu_icon}`} className="w-5" alt="" />
        </div>
      </div>

      {/* nav-items in small screen */}
      <div
        className={`mobile-nav-items fixed top-0 left-0 bottom-0 block transition duration-600 w-full p-0 bg-white ${
          showMenu ? "-translate-x-[0%]" : "translate-x-[100%]"
        }`}
      >
        <p
          className="flex items-center justify-start border-b"
          onClick={handleMenuBack}
        >
          <i className="ri-arrow-drop-left-line text-4xl font-normal text-gray-300"></i>
          <span className="inline-block text-gray-600 font-semibold">Back</span>
        </p>
        <ul className="flex flex-col items-start justify-center">
          <li
            className="uppercase text-lg border-b relative w-screen font-medium"
            onClick={handleMenuBack}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-black text-white" : "text-gray-600"
                } block w-full px-7 py-2`
              }
            >
              Home
            </NavLink>
          </li>
          <li
            className="uppercase text-lg border-b w-full font-medium"
            onClick={handleMenuBack}
          >
            <NavLink
              to="/collection"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-black text-white" : "text-gray-600"
                } block w-full px-7 py-2`
              }
            >
              Collection
            </NavLink>
          </li>

          <li
            className="uppercase text-lg border-b w-full font-medium"
            onClick={handleMenuBack}
          >
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-black text-white" : "text-gray-600"
                } block w-full px-7 py-2`
              }
            >
              About
            </NavLink>
          </li>
          <li
            className="uppercase text-lg border-b w-full font-medium"
            onClick={handleMenuBack}
          >
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-black text-white" : "text-gray-600"
                } block w-full px-7 py-2`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
