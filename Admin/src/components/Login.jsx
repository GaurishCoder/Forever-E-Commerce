// components/Login.jsx
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminStore";

const Login = () => {
  const { setToken } = useContext(AdminContext);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setToken(true); 
        navigate("/add");
      }
    } catch (error) {
      console.log(error);
      toast.error(error,{autoClose:2000,});
    }
  };

  const showPassword = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
        <label className="block mb-2 font-medium">Email Address</label>
        <input
          type="email"
          className="w-full mb-4 px-4 py-2 border rounded"
          placeholder="admin@example.com"
          onChange={handleChange}
          name="email"
          value={formData.email}
        />
        <label className="block mb-2 font-medium">Password</label>
        <div className="w-full relative">
          <input
            type={visible ? "text" : "password"}
            className="w-full mb-6 px-4 py-2 border rounded"
            placeholder="********"
            onChange={handleChange}
            name="password"
            value={formData.password}
          />
          <div
            className="eye-icon absolute top-2 right-3"
            onClick={showPassword}
          >
            {visible ? (
              <i className="ri-eye-off-line"></i>
            ) : (
              <i className="ri-eye-line"></i>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
