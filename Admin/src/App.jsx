import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import List from "./pages/List";
import Add from "./pages/Add";
import Orders from "./pages/Orders";
import { AdminContext } from "./context/AdminStore";
import {ToastContainer} from "react-toastify";
import Login from "./components/Login";
function App() {
  let { token } = useContext(AdminContext);
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {token === false ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <div className="flex w-full ">
            <Sidebar />
            <div className="content w-[75%]  min-h-screen ">
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </div>
          </div>
        </>
      )}
      <ToastContainer autoClose={2000}/>
    </div>
  );
}

export default App;
