import React, { useContext, useState } from "react";
import { ShoppingContext } from "../context/ShoppingStore";
import { Link, useNavigate } from "react-router-dom";

function CartTotal() {
  const { getCartAmount, currency, cartItems } = useContext(ShoppingContext);
  

  return (
    <>
      <div className="section1 w-full  flex justify-between items-center py-2  border-b border-gray-300">
        <p className="text-gray-900 text-sm ">Subtotal</p>
        <p className="text-gray-900 text-sm ">
          {currency} {getCartAmount()}.00
        </p>
      </div>
      <div className="section2 w-full  flex justify-between items-center py-2 border-b border-gray-300">
        <p className="text-gray-900 text-sm ">Shipping Fee</p>
        <p className="text-gray-900 text-sm ">{currency} 10.00</p>
      </div>
      <div className="section3 w-full  flex justify-between items-center py-2">
        <p className="text-black  font-semibold">Total</p>
        <p className="text-black  font-semibold">
          {currency} {getCartAmount() ? getCartAmount() : 0}.00
        </p>
      </div>
      
    </>
  );
}

export default CartTotal;
