import { useState, useEffect } from "react";
import { assets } from "../assets/admin_assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";

function Add() {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestSeller] = useState(false);
  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  // Form state
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Men",
    subCategory: "Topwear",
    price: "",
    sizes: [],
    bestseller: false,
    images: [],
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      sizes: sizes,
      bestseller: bestseller,
      images: [image1, image2, image3, image4].filter((item) => item != false),
    }));
  }, [sizes, bestseller, image1, image2, image3, image4]);

  const handleSubmitData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("subCategory", data.subCategory);
    formData.append("price", data.price);
    formData.append("bestseller", bestseller); // Boolean
    formData.append("sizes", JSON.stringify(sizes));

    // Append images
    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);
    if (image3) formData.append("image3", image3);
    if (image4) formData.append("image4", image4);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // if using cookies
        }
      );
      console.log(res);
      if (res.status === 200) {
        toast.success("Product Added Successfully!!");
        setData((prev) => ({
          ...prev,
          sizes: sizes,
          bestseller: bestseller,
          images: [image1, image2, image3, image4].filter(
            (item) => item != false
          ),
        }));
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.error("Upload Error:", error);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSize = (e) => {
    let size = e.target.innerText;
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // ... (rest of your JSX remains the same)

  return (
    <form
      onSubmit={handleSubmitData}
      className="w-full sm:max-w-3xl m-5 py-4 px-10 bg-gray-50 rounded-lg "
    >
      <h2 className="text-xl font-medium mb-4 text-gray-600">Upload Image</h2>
      <div className="upload-area-container flex gap-2 w-full">
        <label htmlFor="image1" className="imaged-container">
          <img
            src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
            className="w-20"
            alt=""
          />
          <input
            onChange={(e) => setImage1(e.target.files[0])}
            type="file"
            name="image1"
            id="image1"
            hidden
          />
        </label>
        <label htmlFor="image2" className="imaged-container">
          <img
            src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
            className="w-20"
            alt=""
          />
          <input
            onChange={(e) => setImage2(e.target.files[0])}
            type="file"
            name="image2"
            id="image2"
            hidden
          />
        </label>
        <label htmlFor="image3" className="imaged-container">
          <img
            src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
            className="w-20"
            alt=""
          />
          <input
            onChange={(e) => setImage3(e.target.files[0])}
            type="file"
            name="image3"
            id="image3"
            hidden
          />
        </label>
        <label htmlFor="image4" className="imaged-container">
          <img
            src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
            className="w-20"
            alt=""
          />
          <input
            onChange={(e) => setImage4(e.target.files[0])}
            type="file"
            name="image4"
            id="image4"
            hidden
          />
        </label>
      </div>

      <div className="mb-4 mt-3">
        <label className="text-gray-600 block mb-1 font-medium">
          Product name
        </label>
        <input
          type="text"
          placeholder="Type here"
          name="name"
          value={data.name}
          onChange={handleChange}
          className="w-full px-4 py-2  border border-gray-300 rounded focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-600 block mb-1 font-medium">
          Product description
        </label>
        <textarea
          rows="3"
          name="description"
          value={data.description}
          onChange={handleChange}
          placeholder="Write content here"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-3">
        <div>
          <label className="text-gray-600 block mb-1 font-medium">
            Product category
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded"
            name="category"
            required
            value={data.category}
            onChange={handleChange}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <label className="text-gray-600 block mb-1 font-medium">
            Sub category
          </label>
          <select
            name="subCategory"
            value={data.subCategory}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <label className="text-gray-600 block mb-1 font-medium">
            Product Price
          </label>
          <input
            type="number"
            placeholder="25"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            name="price"
            value={data.price}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="text-gray-600 block mb-1 font-medium">
          Product Sizes
        </label>
        <div className="flex gap-2 mt-3 flex-wrap">
          {sizeOptions.map((size) => (
            <button
              type="button"
              key={size}
              onClick={handleSize}
              className={`py-1 px-[10px] text-sm sm:text-md sm:px-4 rounded text-gray-700 border border-gray-300 ${
                sizes.includes(size) ? "bg-pink-200" : "bg-gray-200"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <input
          type="checkbox"
          id="bestseller"
          className="w-4 h-4"
          onChange={() => setBestSeller((prev) => !prev)}
        />
        <label htmlFor="bestseller" className="text-sm">
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        ADD
      </button>
    </form>
  );
}

export default Add;
