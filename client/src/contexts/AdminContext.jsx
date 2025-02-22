import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { checkLogin } from "../utils/adminApi";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [sideBar, setSideBar] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const response = await checkLogin("admin");
      setIsAdminLoggedIn(response.isLoggedIn || false);
    } catch (error) {
      setIsAdminLoggedIn(false);
      throw new error();
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        sideBar,
        setSideBar,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        loading,
        setLoading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

AdminProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
