import { useContext, useEffect, useState } from "react";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";
import { ShoppingContext } from "../context/ShoppingStore";
import axios from "axios";
import { toast } from "react-toastify";

function PlaceOrder() {
  const navigate = useNavigate();
  const { cartItems, products, token, setCartItems, getCartAmount } =
    useContext(ShoppingContext);
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = async (e) => {
    let { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const initPay = (order) => {
    const option = {
      key: import.meta.env.VITE_RAZORPAY_SECRET_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/order/verifyRazorpay`,
            response,
            { withCredentials: true }
          );
          console.log(data);
          if (data.success) {
            navigate("/orders");
            setCartItems({});
            toast.success(data.message);
          } else {
            toast.error(data.message);
            navigate("/cart");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.responseRazorpay.data.message);
        }
      },
    };
    const rzp = new window.Razorpay(option);
    rzp.open();
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            let itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        items: orderItems,
        address: formData,
        amount: getCartAmount(),
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/order/place`,
            orderData,
            { withCredentials: true }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/order/stripe`,
            orderData,
            { withCredentials: true }
          );
          console.log(responseStripe);
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/order/razorpay`,
            orderData,
            { withCredentials: true }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmitData}
      className="w-full py-5 flex flex-col sm:flex-row  justify-between "
    >
      <div className="section1 w-full sm:w-[40%] flex flex-col gap-3">
        <div className="text-content mt-4  sm:mt-10 py-5 md:py-5 flex   items-center justify-start gap-2 ">
          <div className="text-1 flex items-center  justify-start w-full gap-3  ">
            <div className="text-1-value text-2xl uppercase flex gap-2  items-center md:flex-row  font-medium text-[#414141]">
              <span className="text-gray-500 font-normal ">delivery</span>{" "}
              information
            </div>
            <div className="line w-10 border text-black"></div>
          </div>
        </div>

        <div className="personal-info w-full flex flex-col gap-3 ">
          <div className="input-1 w-full flex justify-center gap-3">
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 font-normal placeholder:text-gray-400 px-3 border py-2 border-gray-300 rounded-sm"
              required
            />
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 font-normal placeholder:text-gray-400 px-3 border py-2 border-gray-300 rounded-sm"
              required
            />
          </div>
          <div className="input-2 w-full">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full font-normal placeholder:text-gray-400 px-3 border py-2 border-gray-300 rounded-sm"
              required
            />
          </div>
          <div className="input-3 w-full">
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              className="w-full font-normal placeholder:text-gray-400 px-3 border py-2 border-gray-300 rounded-sm"
              required
            />
          </div>
          <div className="input-4 w-full flex justify-center gap-3">
            <input
              required
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-1/2 font-normal placeholder:text-gray-400 px-3 border py-2 border-gray-300 rounded-sm "
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-1/2 font-normal placeholder:text-gray-400 px-3 border py-2 border-gray-300 rounded-sm"
              required
            />
          </div>
          <div className="input-5 w-full flex justify-center gap-3">
            <input
              type="number"
              placeholder="Zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              className="w-1/2 font-normal placeholder:text-gray-400 px-3 border py-2 border-gray-300 rounded-sm"
              required
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-1/2 font-normal placeholder:text-gray-400 px-3 border py-2 border-gray-300 rounded-sm"
              required
            />
          </div>
          <div className="input-6 w-full">
            <input
              type="number"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full font-normal placeholder:text-gray-400 px-3 border py-2 border-gray-300 rounded-sm"
              required
            />
          </div>
        </div>
      </div>
      <div className="section2 w-full sm:w-1/2  flex flex-col items-center justify-center gap-3">
        <div className="text-content mt-4  sm:mt-10 py-5 md:py-2 flex w-full  sm:w-[80%]   items-center justify-start  gap-2 ">
          <div className="text-1 flex items-center  justify-start w-full gap-3  ">
            <div className="text-1-value text-2xl uppercase flex gap-2  items-center md:flex-row  font-medium text-[#414141]">
              <span className="text-gray-500 font-normal ">Cart</span> Totals
            </div>
            <div className="line w-10 border text-black"></div>
          </div>
        </div>
        <div className="cart-total w-full sm:w-[80%]  flex flex-col items-center justify-end ">
          <CartTotal />

          <div className="payment-methods  w-full">
            <div className="text-content mt-4  sm:mt-5 py-5 md:py-2 flex w-full items-center justify-start  gap-2 ">
              <div className="text-1 flex items-center  justify-start w-full gap-3  ">
                <div className="text-1-value text-lg uppercase flex gap-1  items-center md:flex-row  font-medium text-[#414141]">
                  <span className="text-gray-500 font-normal ">payment</span>{" "}
                  method
                </div>
                <div className="line w-15 border text-black"></div>
              </div>
            </div>
            <div
              className="payment-option flex flex-col lg:flex-row items-center justify-center gap-3"
              name="payment"
            >
              <div className="option w-full flex  border border-gray-200  items-center gap-2 p-2">
                <input
                  type="radio"
                  name="payment"
                  value="stripe"
                  onChange={(e) => setMethod(e.target.value)}
                  required
                />
                <img src={assets.stripe_logo} className="w-15 h-6" alt="" />
              </div>
              <div className="option w-full flex  border border-gray-200  items-center gap-2 p-2">
                <input
                  type="radio"
                  name="payment"
                  value="razorpay"
                  onChange={(e) => setMethod(e.target.value)}
                  required
                />
                <img src={assets.razorpay_logo} className="w-20 h-6" alt="" />
              </div>
              <div className="option w-full flex   border border-gray-200 items-center gap-2 p-2 whitespace">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  onChange={(e) => setMethod(e.target.value)}
                  required
                />
                <p className="text-md text-gray-600 uppercase whitespace-nowrap ">
                  cash on delivery
                </p>
              </div>
            </div>
          </div>

          <div className="place-order-button w-full flex justify-end items-center py-3">
            <button
              type="submit"
              className="px-15 py-3 bg-black text-white uppercase text-sm rounded-xs cursor-pointer"
            >
              place order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;