import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleFormData = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
        formData,
        { withCredentials: true }
      );
      toast.success("User Register!!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="  flex flex-col items-center justify-center px-4 py-15"
    >
      <h1 className="text-3xl prata-font font-medium mb-6 flex items-center gap-2">
        Sign Up <span className=" w-10 h-0 border  "></span>
      </h1>
      <div className="w-full max-w-sm">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleFormData}
          className="w-full border px-4 py-2 mb-4 outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleFormData}
          className="w-full border px-4 py-2 mb-4 outline-none"
        />
        <p className=" relative">
          <input
            type={visible ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleFormData}
            className="w-full border px-4 py-2 mb-2 outline-none"
          />
          {visible ? (
              <i className="ri-eye-off-line absolute top-2 right-4" onClick={()=> setVisible(false)}></i>
            ) : (
              <i className="ri-eye-line absolute top-2 right-4" onClick={()=> setVisible(true)}></i>
            )}
        </p>

        <div className="flex justify-between text-sm mb-4">
          <Link to="/forgot" className="text-gray-700 ">
            Forgot your password?
          </Link>
          <Link to="/login" className="text-gray-700 ">
            Login Here
          </Link>
        </div>
        <div className="flex justify-center mt-10  items-center">
          <button className="w-[30%]  bg-black text-white py-2 cursor-pointer">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
};

export default Signup;
