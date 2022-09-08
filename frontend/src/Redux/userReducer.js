import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "./axios";

const STATUS = Object.freeze({
  LOADING: "loading",
  SUCCESS: "success",
  FAIL: "fail",
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
    status: STATUS.SUCCESS,
  },
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});
export const { setUser, setStatus } = userSlice.actions;
export default userSlice.reducer;

export const authUser = (email, password) => {
  return async function authUserThunk(dispatch) {
    try {
      dispatch(setStatus(STATUS.LOADING));
      const { data } = await axiosInstance.post("/api/user/auth", {
        email,
        password,
      });
      dispatch(setUser(data));
      dispatch(setStatus(STATUS.SUCCESS));
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      dispatch(setUser(error));
      dispatch(setStatus(STATUS.FAIL));
    }
  };
};
export const createUser = (name, email, password) => {
  return async function createUserThunk(dispatch) {
    try {
      dispatch(setStatus(STATUS.LOADING));
      const { data } = await axiosInstance.post("/api/user/create", {
        name,
        email,
        password,
      });
      dispatch(setUser(data));
      dispatch(setStatus(STATUS.SUCCESS));
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      dispatch(setUser(error));
      dispatch(setStatus(STATUS.FAIL));
    }
  };
};
export const updateUser = (id, name, email, password) => {
  return async function updateUserThunk(dispatch) {
    try {
      dispatch(setStatus(STATUS.LOADING));
      const { data } = await axiosInstance.post(`/api/user/${id}`, {
        name,
        email,
      });
      dispatch(setUser(data));
      dispatch(setStatus(STATUS.SUCCESS));
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      dispatch(setUser(error));
      dispatch(setStatus(STATUS.FAIL));
    }
  };
};
export const removeUser = (id) => {
  return async function removeUserThunk(dispatch) {
    try {
      dispatch(setStatus(STATUS.LOADING));
      const { data } = await axiosInstance.delete(`/api/user/${id}`);
      dispatch(setUser(data));
      dispatch(setStatus(STATUS.SUCCESS));
      localStorage.removeItem("user");
    } catch (error) {
      dispatch(setUser(error));
      dispatch(setStatus(STATUS.FAIL));
    }
  };
};
export const logoutUser = () => {
  return async function logoutThunk(dispatch) {
    localStorage.removeItem("user");
    dispatch(setUser({}));
  };
};
