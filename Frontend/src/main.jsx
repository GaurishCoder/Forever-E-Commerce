import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ShoppingContextProvider from "./context/ShoppingStore.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShoppingContextProvider>
      <App />
    </ShoppingContextProvider>
  </BrowserRouter>
);
