import { useContext, useEffect, useState } from "react";
import { ShoppingContext } from "../context/ShoppingStore";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

function Search() {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShoppingContext);

  const [visible, setVisible] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  const handleChange = (e) => {
    let { value } = e.target;
    setSearch(value);
  };

  return showSearch && visible ? (
    <div className="w-full border-b border-t bg-[#F9FAFB] border-gray-200  flex items-center justify-center py-6 gap-3">
      <div className="search relative w-[50%] ">
        <input
          type="text"
          value={search}
          onChange={handleChange}
          className="px-4 py-1 border border-gray-400 w-full outline-none placeholder:text-sm placeholder:text-gray-400 rounded-full "
          placeholder="Search"
        />
        <img
          src={assets.search_icon}
          className=" w-4 absolute top-2 right-3"
          alt=""
        />
      </div>
      <div className="cross" onClick={() => setShowSearch(false)}>
        <img src={assets.cross_icon} className="w-3 cursor-pointer" alt="" />
      </div>
    </div>
  ) : null;
}

export default Search;
