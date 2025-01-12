import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllRiders } from "../utils/riderApi";
import { checkLogin } from "../utils/adminApi";

export const RidersContext = createContext();

export const RidersProvider = ({ children }) => {
  const [riders, setRiders] = useState([]);
  const [individualRider, setIndividualRider] = useState({});
  const [refreshRider, setRefreshRider] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRiderLoggedIn, setIsRiderLoogedIn] = useState(false);

  const fetchAllRiders = async () => {
    try {
      setLoading(true);
      const res = await getAllRiders();

      if (res.success) {
        setRiders(res.riders);
        setRefreshRider(false);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
      setRefreshRider(false);
    }
  };

  useEffect(() => {
    fetchAllRiders();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await checkLogin("rider");
      setIsRiderLoogedIn(response.isLoggedIn || false);
    } catch (error) {
      console.error("Error checking login status:", error);
      setIsRiderLoogedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <RidersContext.Provider
      value={{
        riders,
        setRiders,
        individualRider,
        setIndividualRider,
        refreshRider,
        setRefreshRider,
        loading,
        setLoading,
        isRiderLoggedIn,
        setIsRiderLoogedIn,
      }}
    >
      {children}
    </RidersContext.Provider>
  );
};

RidersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
