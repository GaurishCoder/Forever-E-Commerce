import React, { useContext, useEffect, useState } from "react";
import { assets, products } from "../assets/frontend_assets/assets";
import { AdminContext } from "../context/AdminStore";
import axios from "axios";
import { toast } from "react-toastify";

function List() {
  const [productData, setProductData] = useState([]);
  const { token } = useContext(AdminContext);
  const fetchProduct = async () => {
    let response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/show`,
      { withCredentials: true }
    );
    let data = response.data.product;
    setProductData(data);
  };

  const deleteProduct = async (item) => {
    let id = item._id;
    try {
      let response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/delete/${id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        let updatedProduct = productData.filter((item) => item._id !== id);
        setProductData(updatedProduct);
      }
      toast.success("Product Deleted Sucessfully");
    } catch (error) {
      console.log(error);
      toast.error("Product not found!!");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [token]);

  // console.log(productData);
  return (
    <div className="w-full px-4 sm:px-15 py-6 ">
      <h1 className="text-gray-600 mb-3 ">All Products List</h1>
      <div className="list w-full ">
        <div className="headers hidden sm:grid grid-cols-[1fr_3fr_1fr_1fr_0.5fr] gap-2 py-1 px-2 bg-gray-100 ">
          <p className="font-bold text-sm text-gray-600">Image</p>
          <p className="font-bold text-sm text-gray-600">Name</p>
          <p className="font-bold text-sm text-gray-600">Category</p>
          <p className="font-bold text-sm text-gray-600">Price</p>
          <p className="font-bold text-sm text-gray-600">Action</p>
        </div>
        {productData.map((item, idx) => {
          return (
            <div
              key={idx}
              className="product-data-list border border-gray-200 py-1 px-2 grid gap-2 grid-cols-[1fr_3fr_1fr_1fr_0.5fr] mt-3 items-center"
            >
              <img src={item.images[0].url} className="w-12 h-16  " alt="" />
              <p className="text-gray-600 sm:text-sm text-[11px]">
                {item.name}
              </p>
              <p className="text-gray-600 text-[11px] sm:text-sm">{item.category} </p>
              <p className="text-gray-600 text-[11px] sm:text-sm">${item.price}</p>
              <p
                className="text-gray-600 text-lg sm:text-2xl"
                onClick={() => deleteProduct(item)}
              >
                <i className="ri-close-fill"></i>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
