import axios from "axios";
import { SERVER_PORT } from "./constants";

export const addRider = async (data) => {
  try {
    const response = await axios.post(`${SERVER_PORT}/rider/add-rider`, data, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllRiders = async () => {
  try {
    const response = await axios.get(`${SERVER_PORT}/rider/get-all-rider`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getIndividualRider = async (riderId) => {
  try {
    const response = await axios.get(
      `${SERVER_PORT}/rider/get-individual-rider/${riderId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateRider = async (riderId, updatedData) => {
  try {
    const response = await axios.patch(
      `${SERVER_PORT}/rider/update-rider/${riderId}`,
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

export const deleteRider = async (riderId) => {
  try {
    const response = await axios.delete(
      `${SERVER_PORT}/rider/delete-rider/${riderId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const riderLogin = async (data) => {
  try {
    const res = await axios.post(`${SERVER_PORT}/rider/rider-login`, data, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return error;
  }
};

export const riderLogout = async () => {
  try {
    const response = await axios.delete(`${SERVER_PORT}/rider/rider-logout`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const riderDashboard = async () => {
  try {
    const res = await axios.post(
      `${SERVER_PORT}/rider/rider-dashboard`,
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

export const deliverStatusUpdate = async () => {
  try {
    const res = await axios.post(
      `${SERVER_PORT}/rider/update-deliver-status`,
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
