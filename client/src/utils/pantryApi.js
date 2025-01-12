import axios from "axios";
import { SERVER_PORT } from "./constants";

export const addPantryStaff = async (data) => {
  try {
    const response = await axios.post(
      `${SERVER_PORT}/pantry/add-pantry-staff`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllPantryStaff = async () => {
  try {
    const response = await axios.get(
      `${SERVER_PORT}/pantry/get-all-pantry-staff`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getIndividualPantryStaffMember = async (pantryStaffId) => {
  try {
    const response = await axios.get(
      `${SERVER_PORT}/pantry/get-individual-pantry-staff/${pantryStaffId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updatePantryStaff = async (pantryStaffId, updatedData) => {
  try {
    const response = await axios.patch(
      `${SERVER_PORT}/pantry/update-pantry-staff/${pantryStaffId}`,
      updatedData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const deletePantryStaff = async (pantryStaffId) => {
  try {
    const response = await axios.delete(
      `${SERVER_PORT}/pantry/delete-pantry-staff/${pantryStaffId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const pantryStaffLogin = async (data) => {
  try {
    const res = await axios.post(
      `${SERVER_PORT}/pantry/pantry-staff-login`,
      data,
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const pantryLogout = async () => {
  try {
    const response = await axios.delete(`${SERVER_PORT}/pantry/pantry-logout`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const pantryStaffDashboard = async () => {
  try {
    const res = await axios.post(
      `${SERVER_PORT}/pantry/pantry-staff-dashboard`,
      {},
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const mealStatusUpdate = async () => {
  try {
    const res = await axios.post(
      `${SERVER_PORT}/pantry/update-meal-status`,
      {},
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    return error;
  }
};
