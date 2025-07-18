import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const fetchToken = async () => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/verify`,
        {
          withCredentials: true,
        }
      );
      let data = response.data.success;
      setToken(data);
    } catch (error) {
      setToken(false);
    }
  };
  useEffect(() => {
    fetchToken();
  }, []);
  let value = { token, setToken };
  return (
    <>
      <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    </>
  );
};

export default AdminContextProvider;
