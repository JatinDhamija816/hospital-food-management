import axios from "axios";
import { SERVER_PORT } from "./constants";

export const adminLogin = async (data) => {
  try {
    const res = await axios.post(`${SERVER_PORT}/admin/admin-login`, data, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    return error;
  }
};

export const checkLogin = async (role) => {
  try {
    const response = await axios.post(
      `${SERVER_PORT}/admin/check-login`,
      { role },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const adminLogout = async () => {
  try {
    const response = await axios.delete(`${SERVER_PORT}/admin/admin-logout`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const assignMealToStaff = async (data) => {
  try {
    const response = await axios.post(
      `${SERVER_PORT}/admin/assign-meal`,
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

export const fetchAllAssignMeal = async () => {
  try {
    const response = await axios.get(
      `${SERVER_PORT}/admin/get-all-assign-meal`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
};
