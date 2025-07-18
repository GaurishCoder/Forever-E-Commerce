import React from "react";
import { useContext } from "react";
import { ShoppingContext } from "../context/ShoppingStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Verify() {
  const { token, setCartItems } = useContext(ShoppingContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/verifyStripe`,
        { success, orderId },
        { withCredentials: true }
      );
      if (response.data.success) {
        setCartItems({});
        toast.success(response.data.message);
        navigate("/orders");
      } else {
        toast.error(response.data.message);
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);
  return <div></div>;
}

export default Verify;
