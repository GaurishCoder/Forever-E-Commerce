import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingContext } from "../context/ShoppingStore";
import { assets } from "../assets/frontend_assets/assets";
import { ToastContainer, toast } from "react-toastify";
import ProductItem from "../components/ProductItem";

function ProductPage() {
  const { productId } = useParams();
  const { products, currency, addToCart, setToken,cartItems } =
    useContext(ShoppingContext);
  const [productItem, setProductItem] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [selectSize, setSelectSize] = useState(false);
  const [size, setSize] = useState("");
  const [image, setImage] = useState("");

  const fetchData = () => {
    if (products.length > 0) {
      const [item] = products.filter((item) => productId === item._id);
      setProductItem(item);
      setImage(item.images[0].url);
      relatedProductData();
    }
  };

  useEffect(() => {
    fetchData();
  }, [products,addToCart,cartItems])
  

  const relatedProductData = () => {
    let productCopy = products.slice();
    let data = productCopy.filter(
      (item) => item.category === productItem.category
    );
    data = data.filter((item) => item.subCategory === productItem.subCategory);
    setRelatedProduct(data.slice(0, 5));
  };

  const handleSizeButton = (e) => {
    let value = e.target.textContent;
    if (size) {
      setSize(false);
      setSelectSize("");
    } else {
      setSize(true);
      setSelectSize(value);
    }
  };

  const hanldeAddCart = () => {
    if (size) {
      toast.success("Product Added to Cart", {
        autoClose: 2000,
        theme: "colored",
      });
      setToken(true);
      addToCart(productItem._id, selectSize);
    } else {
      toast.error("Select Product Size", { autoClose: 2000, theme: "colored" });
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  useEffect(() => {
    relatedProductData();
  }, [productItem, productId]);

  return (
    <div className="w-full pt-10  ">
      <div className="section1 w-full  flex flex-col sm:flex-row gap-6">
        <div className="image-container flex flex-col-reverse md:flex-row items-start gap-3 w-full sm:w-1/2">
          {/* Thumbnails Section */}
          <div className="image-1 w-full md:w-[20%] grid grid-cols-4 md:grid-rows-4 md:grid-cols-1 h-32 md:h-[80vh]  overflow-x-auto md:overflow-y-auto">
            <div className="w-full h-full flex flex-row md:flex-col">
              {productItem.images?.map((item, idx) => (
                <img
                  src={item.url}
                  className="w-full h-auto object-cover p-1"
                  key={idx}
                  alt=""
                  onClick={() => setImage(item.url)}
                />
              ))}
            </div>
          </div>

          {/* Main Image Section */}
          <div className="image-2 w-full md:w-[80%]">
            <img
              src={image || "photo"}
              className="w-full h-auto object-contain"
              alt=""
            />
          </div>
        </div>

        <div className="product-details sm:w-1/2 py-3 px-4">
          <div className="product-title flex flex-col gap-2">
            <p className="text-2xl font-medium">{productItem.name}</p>
            <p className="flex items-center gap-1">
              <img src={assets.star_icon} className="w-3" alt="" />
              <img src={assets.star_icon} className="w-3" alt="" />
              <img src={assets.star_icon} className="w-3" alt="" />
              <img src={assets.star_icon} className="w-3" alt="" />
              <img src={assets.star_dull_icon} className="w-3" alt="" />
              <span className="ml-2">(122)</span>
            </p>
          </div>
          <div className="price flex flex-col items-start mt-5 gap-6">
            <p className="text-3xl font-medium">
              {currency}
              {productItem.price}
            </p>
            <p className="gray text-md max-w-[83%]">
              {productItem.description}
            </p>
          </div>
          <div className="size flex flex-col items-start mt-6 gap-4">
            <p>Select Size</p>
            <div className="size-types flex gap-2 items-center">
              {productItem.sizes?.map((item, idx) => {
                return (
                  <button
                    className={`px-4 bg-gray-100 py-2 cursor-pointer ${
                      item === selectSize
                        ? "border border-orange-400"
                        : "border-none"
                    }`}
                    key={idx}
                    onClick={handleSizeButton}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="addToCart flex flex-col items-start my-6 gap-4 ">
            <button
              className="bg-black uppercase text-white px-7 py-3 text-sm cursor-pointer"
              onClick={hanldeAddCart}
            >
              add to cart
            </button>
          </div>
          <hr className="border border-gray-100 w-full my-2" />
          <div className="product-policy flex flex-col gray text-sm mt-7">
            <span className="inline-block">100% Original product.</span>
            <span className="inline-block">
              Cash on delivery is available on this product.
            </span>
            <span className="inline-block">
              Easy return and exchange policy within 7 days.
            </span>
          </div>
        </div>
      </div>
      <div className="section2 w-full my-10 px-4">
        <div className="top flex ">
          <div className="description w-fit">
            <p className="border text-gray-900 font-semibold py-2 px-4 text-md border-gray-300">
              Description
            </p>
          </div>
          <div className="Review w-fit">
            <p className="border text-gray-900 py-2 px-4 text-md border-gray-300">
              Review(122)
            </p>
          </div>
        </div>
        <div className="bottom border border-gray-300 py-4 px-4 flex flex-col justify-start gap-5">
          <p className="text-gray-500 text-sm ">
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p className="text-gray-500 text-sm ">
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors).Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      {/* Related Product */}
      <div className="section3 related-product">
        <div className="text-content mt-4  sm:mt-10 py-5 md:py-5 flex  items-center justify-center gap-2 ">
          <div className="text-1 flex items-center  justify-center w-full gap-3  ">
            <div className="text-1-value text-3xl uppercase flex gap-2  items-center md:flex-row  font-medium text-[#414141]">
              <span className="text-gray-500 font-normal ">Related</span>{" "}
              Products
            </div>
            <div className="line w-10 border text-black"></div>
          </div>
        </div>

        <div>
          <div className="manage grid grid-row-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-2">
            {relatedProduct.map((e) => (
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
      </div>
    </div>
  );
}

export default ProductPage;
