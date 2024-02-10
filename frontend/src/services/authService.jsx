import { AxiosError } from "axios";
import { sgpApi } from "../api/sgpApi";

export class AuthService {
  /* Login */

  static login = async (email, password) => {
    try {
      const { data } = await sgpApi.post("/auth/login", {
        email,
        password,
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
      throw new Error("An error occurred while logging in");
    }
  };

  static validateUser = async (email, password) => {
    try {
      const { data } = await sgpApi.post("/auth/validate-user", {
        email,
        password,
      });
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  static MultifaAunthentication = async (code, token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/2fa/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ twoFactorAuthenticationCode: code}),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  /* Register */

  static register = async (email, fullName, password) => {
    try {
      const { data } = await sgpApi.post("/auth/register", {
        email,
        fullName,
        password,
      });
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  /* Status */

  static checkStatus = async () => {
    try {
      const { data } = await sgpApi.get("/auth/check-status");
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  static getUserById = async (userId) => {
    try {
      const { data } = await sgpApi.get("/auth/find-user/" + userId);
      return data.roles;
    } catch (error) {
      throw error.response.data.message;
    }
  };
}
