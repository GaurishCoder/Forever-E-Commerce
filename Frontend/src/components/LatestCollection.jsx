import React, { useContext, useEffect, useState } from "react";
import { ShoppingContext } from "../context/ShoppingStore";
import ProductItem from "./ProductItem";

function LatestCollection() {
  const [items, setItems] = useState([]);
  const { products } = useContext(ShoppingContext);
  useEffect(() => {
    let data = products.slice(10,20);
    data.reverse();
    setItems(data);
  }, [products]);

  return (
    <div>
      <div className="text-content mt-4  sm:mt-10 py-5 md:py-10 flex flex-col items-center justify-center gap-2">
        <div className="text-1 flex items-center  justify-center w-full gap-3  ">
          <div className="text-1-value text-3xl uppercase flex gap-2 flex-col items-center md:flex-row  font-medium text-[#414141]">
            <span className="text-gray-500 font-normal ">Latest</span>{" "}
            Collections
          </div>
          <div className="line w-10 border text-black"></div>
        </div>
        <p className="text-sm sm:text-base text-gray-500 text-center ">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>
      <div className="grid-box w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-hidden gap-3 p-2">
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

export default LatestCollection;
