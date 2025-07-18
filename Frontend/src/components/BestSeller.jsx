import React, { useContext, useEffect, useState } from "react";
import { ShoppingContext } from "../context/ShoppingStore";
import ProductItem from "./ProductItem";

function BestSeller() {
  const [items, setItems] = useState([]);
  const { products } = useContext(ShoppingContext);

  useEffect(() => {
    if (products.length > 0) {
      let value = products.filter((e) => {
        return e.bestSeller;
      });
      setItems(value);
    }
  }, [products]);
  
  return (
    <div>
      <div className="text-content mt-4 sm:mt-10 py-5 md:py-5 flex flex-col items-center justify-center gap-2 md:gap-4 ">
        <div className="text-1 flex items-center  justify-center w-full gap-3   ">
          <div className="text-1-value text-3xl uppercase flex gap-1 sm:gap-2    font-medium text-[#414141]">
            <span className="text-gray-500 font-normal ">BEST </span> SELLERS
          </div>
          <div className="line w-10 border text-black"></div>
        </div>
        <p className="text-sm sm:text-base text-gray-500 text-center mb-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>
      <div className="grid-box grid grid-row-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-2">
        {items.map((e) => (
          <ProductItem
            key={e._id}
            img={e.images[0].url}
            title={e.name}
            price={e.price}
            id={e._id}
          />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
