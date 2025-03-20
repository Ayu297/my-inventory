import { createContext, useContext, useReducer } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
  username: localStorage.getItem("username")
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "LOGOUT":
      return { ...state, isLoggedIn: false, token: null, user: null};
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const login = async (username, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      const { data } = response.data;
      if (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.id);
        localStorage.setItem("username", data.username);
        localStorage.setItem("isLoggedIn", true);
        dispatch({
          type: "LOGIN",
          payload: { token: data.token, id: data.id, username: data.username },
        });
        return true;
      }
    } catch (error) {
      console.error("Login Failed: ", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    dispatch({ type: "LOGOUT" });
  };

  const register = async (username, name, password) => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        username,
        name,
        password,
      });
      if (response.status === 201) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };

  const value = { ...authState, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
