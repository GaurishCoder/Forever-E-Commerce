import React, { useContext, useEffect, useState } from "react";
import { ShoppingContext } from "../context/ShoppingStore";
import axios from "axios";
import { toast } from "react-toastify";

function Order() {
  const { products, currency } = useContext(ShoppingContext);
  const [orderData, setOrderData] = useState([]);

  const fetchOrderData = async (req, res) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/userorders`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        let allOrder = [];
        response.data.order.map((order) => {
          order.items.map((item) => {
            item["payment"] = order.payment;
            item["status"] = order.status;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrder.push(item);
          });
        });

        setOrderData(allOrder);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  

  return (
    <div className="w-full py-4">
      <div className="section1">
        <div className="text-content mt-4  sm:mt-10 py-5 md:py-2 flex w-full  sm:w-[80%]   items-center justify-start  gap-2 ">
          <div className="text-1 flex items-center  justify-start w-full gap-3  ">
            <div className="text-1-value text-2xl uppercase flex gap-2  items-center md:flex-row  font-medium text-[#414141]">
              <span className="text-gray-500 font-normal ">My</span> Orders
            </div>
            <div className="line w-10 border text-black"></div>
          </div>
        </div>
      </div>
      <div className="section2">
        {orderData.map((item, index) => {
          return (
            <div
              key={index}
              className="order-details flex items-start gap-6  w-full  py-2 justify-around border-y border-gray-200"
            >
              <div className="flex items-center  gap-4 w-full ">
                <div className="img mt-0  sm:mt-3">
                  <img
                    src={item.images[0].url}
                    className="max-w-17 sm:max-w-25  h-25 sm:h-28"
                    alt=""
                  />
                </div>
                <div className="product-content flex flex-col gap-1">
                  <div className="product-name">
                    <p className="text-[13px] sm:text-lg font-medium text-gray-700">
                      {item.name}
                    </p>
                  </div>
                  <div className="price-size flex flex-col sm:flex-row justify-start  items-start sm:items-center gap-1 sm:gap-3 ">
                    <p className="flex items-center  gap-5 text-sm sm:text-md">
                      {currency}
                      {item.price}
                    </p>

                    <p className="text-sm sm:text-md">
                      Quantity:{item.quantity}
                    </p>
                    <p className="text-sm sm:text-md flex gap-2 items-center">
                      Size:
                      <button className="px-1 sm:px-3 bg-gray-50 py-0 sm:py-1 cursor-pointer border border-gray-200 ">
                        {item.size}
                      </button>
                    </p>
                  </div>
                  <div className="date flex justify-center flex-col text-sm gap-1">
                    <p className="text-gray-500 text-sm">
                      <span className="text-black mr-1">Date:</span>{new Date(item.date).toDateString()}
                    </p>

                    <p className="text-gray-500 text-sm">
                      <span className="text-black mr-1">Payment:</span>{item.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>

              <div className="ready-to-ship  justify-end flex items-center w-[70%] h-33 gap-2">
                <p className="min-w-2 h-2 sm:w-2 sm:h-2  rounded-full bg-green-400"></p>
                <p className="capitalize text-sm sm:text-md ">{item.status}</p>
              </div>
              <div className="track-order flex items-center w-full  gap-2 justify-end  h-33 ">
                <button onClick={fetchOrderData} className="px-1 sm:px-3 py-1 border border-gray-300 capitalize text-sm">
                  track order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Order;
