import React, { useContext } from "react";
import { products } from "../assets/frontend_assets/assets";
import { ShoppingContext } from "../context/ShoppingStore";
import {Link} from "react-router-dom"

function ProductItem({ id,img, title, price }) {
  const { currency } = useContext(ShoppingContext);

  return (
    <>
      <Link to={`/product/${id}`}>
        <div className="product-container">
          <div className="product-image overflow-hidden ">
            <img
              src={img}
              alt=""
              className="w-full h-full object-bottom object-contain transform transition-transform duration-300 hover:scale-110"
            />
          </div>

          <div className="product-description flex flex-col gap-1 my-2">
            <p className="gray font-medium text-sm ">{title}</p>
            <p className="text-gray-800 font-semibold text-sm">
              {currency}
              {price}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ProductItem;
