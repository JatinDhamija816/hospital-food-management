import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllPatients } from "../utils/patientApi";

export const PatientsContext = createContext();

export const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [individualPatient, setIndividualPatient] = useState({});
  const [refreshPatient, setRefreshPatient] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAllPatients = async () => {
    try {
      setLoading(true);
      const res = await getAllPatients();
      if (res.success) {
        setPatients(res.patients);
        setRefreshPatient(false);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPatients();
  }, [refreshPatient]);

  return (
    <PatientsContext.Provider
      value={{
        patients,
        setPatients,
        individualPatient,
        setIndividualPatient,
        refreshPatient,
        setRefreshPatient,
        loading,
        setLoading,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

PatientsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
