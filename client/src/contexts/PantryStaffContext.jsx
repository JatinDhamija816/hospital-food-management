import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllPantryStaff } from "../utils/pantryApi";
import { checkLogin } from "../utils/adminApi";

export const PantryStaffContext = createContext();

export const PantryStaffProvider = ({ children }) => {
  const [isPantryStaffLoggedIn, setIsPantryStaffLoggedIn] = useState(false);
  const [pantryStaff, setPantryStaff] = useState([]);
  const [individualPantryStaff, setIndividualPantryStaff] = useState({});
  const [refreshPantryStaff, setRefreshPantryStaff] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAllPantryStaff = async () => {
    try {
      setLoading(true);
      const res = await getAllPantryStaff();
      if (res.success) {
        setPantryStaff(res.staff);
        setRefreshPantryStaff(false);
      }
    } catch (error) {
      console.error("Error fetching pantry staff:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPantryStaff();
  }, [refreshPantryStaff]);

  const checkLoginStatus = async () => {
    try {
      const response = await checkLogin("pantry");
      setIsPantryStaffLoggedIn(response.isLoggedIn || false);
    } catch (error) {
      console.error("Error checking login status:", error);
      setIsPantryStaffLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <PantryStaffContext.Provider
      value={{
        pantryStaff,
        setPantryStaff,
        individualPantryStaff,
        setIndividualPantryStaff,
        refreshPantryStaff,
        setRefreshPantryStaff,
        loading,
        setLoading,
        isPantryStaffLoggedIn,
        setIsPantryStaffLoggedIn,
      }}
    >
      {children}
    </PantryStaffContext.Provider>
  );
};

PantryStaffProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
