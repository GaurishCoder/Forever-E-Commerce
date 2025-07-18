import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets.js";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

function Orders() {
  let [orderData, setOrderData] = useState([]);
  let url = import.meta.env.VITE_BACKEND_URL;
  // const [status, setStatus] = useState("Order Placed");

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/list`,
        { withCredentials: true }
      );
      let data = response.data.order;
      setOrderData(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);


  const handleStatus = async (order, e) => {
    try {
      let orderId = order._id;
      let status = e.target.value;
      const response = await axios.post(`${url}/api/order/status`,{orderId,status},{withCredentials:true});
      if(response.status === 200){
        await fetchOrderData();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };



  return (
    <div>
      <div className="max-container w-full sm:max-w-5xl mx-auto px-4 py-10">
        <h1 className="mb-3">Order Page</h1>
        <div className="order-container flex flex-col gap-7">
          {/* Order lists */}
          {orderData.map((orders, idx) => {
            return orders.items.map((item) => {
              return (
                <div
                  key={idx}
                  className="order-content grid grid-cols-1 sm:grid sm:grid-cols-[1fr_2fr_1fr_1fr_1fr] px-5 border border-gray-300 py-8"
                >
                  <div className="img ">
                    <img
                      src={assets.parcel_icon}
                      alt="upload_area"
                      className="w-20 h-20"
                    />
                  </div>
                  <div className="section-1 flex flex-col gap-2">
                    <p className="name text-gray-500 text-sm sm:text-[15px]">
                      {item.name}
                    </p>
                    <p className="user-name font-medium">
                      {orders.address.firstName} {orders.address.lastName}
                    </p>
                    <p className="address flex flex-col gap-1">
                      <span className="text-sm street text-gray-600">
                        {orders.address.street}
                      </span>
                      <span className="text-sm city text-gray-600">
                        {orders.address.city +
                          " " +
                          orders.address.state +
                          " " +
                          orders.address.zipcode}
                      </span>
                      <span className="text-sm phone-number text-gray-600">
                        {orders.address.phone}
                      </span>
                    </p>
                  </div>
                  <div className="section-2 flex flex-col gap-3">
                    <p className="text-gray-600">Items: {item.quantity}</p>
                    <p className="flex flex-col">
                      <span className="text-sm text-gray-600">
                        Method: {orders.paymentMethod}
                      </span>
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        Payment: {orders.payment ? "Done" : "Pending"}
                      </span>
                      <span className="text-sm text-gray-600">
                        Date: {new Date(orders.date).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                  <div className="section-3 my-3">
                    <p className="text-sm font-medium">$ {orders.amount}</p>
                  </div>
                  <div className="section-4">
                    <select
                      name="status"
                      value={orders.status}
                      className="border px-3 py-1 rounded-sm"
                      onChange={(e) => {
                        handleStatus(orders, e);
                      }}
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipping">Shipping</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
}

export default Orders;
