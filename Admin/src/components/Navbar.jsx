import { useContext } from "react";
import { assets } from "../assets/admin_assets/assets.js";
import axios from "axios";
import { AdminContext } from "../context/AdminStore.jsx";

function Navbar() {
  const {setToken} = useContext(AdminContext);
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/logout`,
        {},
        { withCredentials: true }
      );
      if(response.status === 200){
        setToken(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="w-full px-4 sm:px-15 py-2 flex items-center justify-between border-b border-gray-200">
      <div className="logo">
        <img src={assets.logo} className="w-25 sm:w-35" alt="" />
      </div>
      <div className="logout" onClick={handleLogout}>
        <button className="cursor-pointer bg-[#4B5563] px-4 sm:py-2 sm:px-8 py-1 rounded-full text-white text-sm">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
