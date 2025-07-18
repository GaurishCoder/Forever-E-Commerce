import { useContext, useEffect, useState } from "react";
import { ShoppingContext } from "../context/ShoppingStore";
import ProductItem from "../components/ProductItem";
import { HashRouter } from "react-router-dom";

function Collection() {
  const { products, search, setSearch, showSearch } =
    useContext(ShoppingContext);
  const [visible, setVisible] = useState(false);
  const [filterItems, setFilterItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState("Relavent");

  useEffect(() => {
    setFilterItems(products);
  }, []);

  const handleSortOption = (e) => {
    setSortOption(e.target.value);
    
  };

  const applyFilter = () => {
    let productCopy = [...products];

    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    switch (sortOption) {
      case "Low to High":
        productCopy.sort((a, b) => a.price - b.price);
        break;
      case "High to Low":
        productCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterItems(productCopy);
  };

  const handleCategories = (e) => {
    const { value } = e.target;
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  const handleSubCategroy = (e) => {
    let { value } = e.target;
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  const handleFilterToggle = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, products , sortOption]);

  return (
    <div className="w-full flex flex-col sm:flex-row  items-start ">
      <div className="filter-container w-full sm:max-w-68 flex flex-col items-start sm:items-start justify-center gap-5  px-4 py-3 sm:py-10  md:sticky  md:top-0 ">
        <div className="title  border-gray-300">
          <p
            className="uppercase text-xl text-gray-900 flex items-center"
            onClick={handleFilterToggle}
          >
            FILTERS{" "}
            <span>
              <i
                className={`ri-arrow-right-s-line block sm:hidden ${
                  visible ? "rotate-90" : "rotate-0"
                } `}
              ></i>
            </span>
          </p>
        </div>
        {/* small screen categories and subCategories */}
        <div
          className={`categories border w-full sm:w-60 border-gray-300 p-3 sm:flex flex-col gap-2 ${
            visible ? "block" : "hidden"
          }`}
        >
          <p className="uppercase text-gray-900">CATEGORIES</p>
          <p className="flex items-center gray gap-2 text-sm  py-1">
            <input
              type="checkbox"
              name="Men"
              id="Men"
              value="Men"
              onChange={handleCategories}
            />
            Men
          </p>
          <p className="flex items-center gray gap-2 text-sm  py-1">
            <input
              type="checkbox"
              name="Women"
              id="Women"
              value="Women"
              onChange={handleCategories}
            />
            Women
          </p>
          <p className="flex items-center gray gap-2 text-sm py-1">
            <input
              type="checkbox"
              name="Kids"
              id="Kids"
              value="Kids"
              onChange={handleCategories}
            />
            Kids
          </p>
        </div>
        <div
          className={`type border border-gray-300 p-3 sm:flex flex-col gap-2 w-full sm:w-60   ${
            visible ? "block" : "hidden"
          }`}
        >
          <p className="uppercase text-gray-900">Type</p>
          <p className="flex items-center gray gap-2 text-sm py-1">
            <input
              type="checkbox"
              name="Topwear"
              id="Topwear"
              value="Topwear"
              onChange={handleSubCategroy}
            />
            Topwear
          </p>
          <p className="flex items-center gray gap-2 text-sm py-1">
            <input
              type="checkbox"
              name="Bottomwear"
              id="Bottomwear"
              value="Bottomwear"
              onChange={handleSubCategroy}
            />
            Bottomwear
          </p>
          <p className="flex items-center gray gap-2 text-sm py-1">
            <input
              type="checkbox"
              name="Winterwear"
              id="Winterwear"
              value="Winterwear"
              onChange={handleSubCategroy}
            />
            Winterwear
          </p>
        </div>
      </div>
      <div className="all-collections w-full py-2 sm:py-7 flex flex-col">
        <div className="title w-full  flex items-center justify-between px-4 py-2">
          <div className="head">
            <div className="text-1 flex items-center  justify-center w-full gap-3  ">
              <div className="text-1-value text-2xl uppercase flex gap-2 flex-col items-center md:flex-row  font-medium text-[#414141]">
                <span className="text-gray-500 font-normal ">All</span>{" "}
                Collections
              </div>
              <div className="line w-10 border text-black"></div>
            </div>
          </div>
          <div className="sort">
            <select
              name="sort"
              id=""
              className="border text-sm md:px-2 py-2 border-gray-400 "
              onChange={handleSortOption}
            >
              <option value="Relavent">Sort by: Relavent</option>
              <option value="Low to High">Sort by: Low to High</option>
              <option value="High to Low">Sort by: High to Low</option>
            </select>
          </div>
        </div>
        <div className="grid-box grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mt-3 gap-4 px-2">
          {filterItems.map((e) => (
            <ProductItem
              key={e._id}
              img={e.images[0].url}
              price={e.price}
              title={e.name}
              id={e._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
