import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AdminContextProvider from "./context/AdminStore.jsx";

createRoot(document.getElementById("root")).render(
  <AdminContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AdminContextProvider>
);
