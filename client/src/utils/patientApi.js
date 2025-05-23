import axios from "axios";
import { SERVER_PORT } from "./constants";

export const addPatient = async (patientData) => {
  try {
    const response = await axios.post(
      `${SERVER_PORT}/patient/add-patient`,
      { patientData },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllPatients = async () => {
  try {
    const response = await axios.get(
      `${SERVER_PORT}/patient/get-all-patients`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deletePatient = async (patientId) => {
  try {
    const response = await axios.delete(
      `${SERVER_PORT}/patient//delete-patient/${patientId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getIndividualPatient = async (patientId) => {
  try {
    const response = await axios.get(
      `${SERVER_PORT}/patient//get-individual-patient/${patientId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updatePatient = async (patientId, updatedData) => {
  try {
    const response = await axios.patch(
      `${SERVER_PORT}/patient/update-patient/${patientId}`,
      updatedData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateDietChart = async (patientId, dietChart) => {
  try {
    const response = await axios.patch(
      `${SERVER_PORT}/patient/update-dietChart/${patientId}`,
      dietChart,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
