import { useContext, useState } from "react";
import { ShoppingContext } from "../context/ShoppingStore";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { products, cartItems, currency, updatedQuantity, deleteCartItem } =
    useContext(ShoppingContext);

  const [inputQuantity, setInputQuantity] = useState({});
  const navigate = useNavigate();

  const checkData = () => {
    if (Object.keys(cartItems).length > 0) {
      navigate("/place-order");
    } else {
      navigate("/cart");
    }
  };

  const renderCartItems = () => {
    const items = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity <= 0) continue;

        const product = products.find((p) => p._id === productId);
        if (!product) continue;

        const inputKey = `${productId}-${size}`;

        items.push(
          <div
            key={inputKey}
            className="product-details border-y border-gray-200 flex items-center justify-between sm:justify-center py-5"
          >
            <div className="left flex items-start gap-6 w-[60%]">
              <img
                src={product.images[0].url}
                className="max-w-20 h-28"
                alt={product.name}
              />
              <div className="product-content flex flex-col gap-2">
                <p className="text-sm sm:text-lg font-medium text-gray-700">
                  {product.name}
                </p>
                <p className="flex items-center gap-5">
                  {currency}
                  {product.price}
                  <button className="px-1 sm:px-3 bg-gray-50 py-0 sm:py-1 border border-gray-200">
                    {size}
                  </button>
                </p>
              </div>
            </div>

            <div className="center w-[20%] flex justify-end sm:justify-start">
              <input
                type="number"
                min={1}
                value={
                  inputQuantity[inputKey] !== undefined
                    ? inputQuantity[inputKey]
                    : quantity
                }
                onChange={(e) => {
                  const value = e.target.value;
                  setInputQuantity((prev) => ({
                    ...prev,
                    [inputKey]: value,
                  }));
                }}
                onBlur={(e) => {
                  const finalValue = Number(e.target.value);
                  if (finalValue < 1) return;
                  updatedQuantity(productId, size, finalValue);
                  // Clear the input buffer for this item
                  setInputQuantity((prev) => {
                    const updated = { ...prev };
                    delete updated[inputKey];
                    return updated;
                  });
                }}
                className="border w-10 sm:w-20 pl-2 py-1 border-gray-300"
              />
            </div>

            <div className="right w-[20%] flex justify-end pr-4 sm:pr-10 items-center">
              <img
                onClick={() => deleteCartItem(productId, size)}
                src={assets.bin_icon}
                className="w-5 h-5 cursor-pointer"
                alt="delete"
              />
            </div>
          </div>
        );
      }
    }

    return items.length > 0 ? (
      items
    ) : (
      <div className="text-center text-gray-600 mt-4">
        No products in cart...
      </div>
    );
  };

  return (
    <div className="cart-page">
      <div className="title py-5">
        <div className="text-content mt-4 sm:mt-10 flex items-center justify-start gap-2">
          <div className="text-1 flex items-center justify-start gap-3">
            <div className="text-1-value text-2xl uppercase font-medium text-[#414141]">
              <span className="text-gray-500 font-normal">Your</span> Cart
            </div>
            <div className="line w-10 border"></div>
          </div>
        </div>
      </div>

      {renderCartItems()}

      {Object.keys(cartItems).length > 0 && (
        <div className="cart-total w-full flex items-end flex-col mx-auto">
          <div className="text-content mt-4 sm:mt-10 py-5 flex w-full sm:w-[37%] items-center justify-start gap-2">
            <div className="text-1 flex items-center justify-start w-full gap-3">
              <div className="text-1-value text-2xl uppercase font-medium text-[#414141]">
                <span className="text-gray-500 font-normal">Cart</span> Totals
              </div>
              <div className="line w-10 border"></div>
            </div>
          </div>

          <div className="cart-total-box w-full sm:w-[37%] flex flex-col items-center justify-end">
            <CartTotal />
            <div className="section4 w-full flex justify-end py-1">
              <button
                onClick={checkData}
                className="px-7 py-3 bg-black text-white uppercase text-sm rounded-xs cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
