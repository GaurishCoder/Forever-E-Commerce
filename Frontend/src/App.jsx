import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Search from "./components/Search";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Verify from "./pages/Verify";

function App() {
  return (
    <div className="w-full md:max-w-[78rem] mx-auto p-2 md:p-3 overflow ">
      <Navbar />
      <Search />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <ToastContainer autoClose={2000}/>
      <Footer />
    </div>
  );
}

export default App;
