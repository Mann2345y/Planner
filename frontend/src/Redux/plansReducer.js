import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "./axios";

const STATUS = Object.freeze({
  LOADING: "loading",
  SUCCESS: "success",
  FAIL: "fail",
});

const plansSlice = createSlice({
  name: "plans",
  initialState: {
    data: {},
    status: STATUS.SUCCESS,
  },
  reducers: {
    setPlans(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setPlans, setStatus } = plansSlice.actions;
export default plansSlice.reducer;

export const createPlan = (
  typeOfData,
  title,
  content,
  isStarred,
  sendRemind,
  creator,
  date
) => {
  return async function createPlanThunk(dispatch) {
    try {
      dispatch(setStatus(STATUS.LOADING));
      const { data } = await axiosInstance.post("/api/plans", {
        typeOfData,
        title,
        content,
        isStarred,
        sendRemind,
        creator,
        date,
      });
      dispatch(setPlans(data));
      dispatch(setStatus(STATUS.SUCCESS));
    } catch (error) {
      dispatch(setPlans(error));
      dispatch(setStatus(STATUS.FAIL));
    }
  };
};
export const getUserPlans = () => {
  return async function getUserThunk(dispatch) {
    try {
      dispatch(setStatus(STATUS.LOADING));
      const { data } = await axiosInstance.get("/api/plans");
      dispatch(setPlans(data));
      dispatch(setStatus(STATUS.SUCCESS));
    } catch (error) {
      dispatch(setPlans(error));
      dispatch(setStatus(STATUS.FAIL));
    }
  };
};
export const deletePlan = (id) => {
  return async function deletePlanThunk(dispatch, getState) {
    try {
      dispatch(setStatus(STATUS.LOADING));
      const { data } = await axiosInstance.delete(`/api/plans/${id}`);
      dispatch(setPlans(data));
      dispatch(setStatus(STATUS.SUCCESS));
    } catch (error) {
      dispatch(setPlans(error));
      dispatch(setStatus(STATUS.FAIL));
    }
  };
};
export const updatePlan = (id, title, content, isStarred, sendRemind) => {
  return async function updatePlanThunk(dispatch) {
    try {
      dispatch(setStatus(STATUS.LOADING));
      const { data } = await axiosInstance.post(`/api/plans/${id}`, {
        title,
        content,
        isStarred,
        sendRemind,
      });
      dispatch(setPlans(data));
      dispatch(setStatus(STATUS.SUCCESS));
    } catch (error) {
      dispatch(setPlans(error));
      dispatch(setStatus(STATUS.FAIL));
    }
  };
};
