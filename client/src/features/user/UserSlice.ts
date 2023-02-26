import { createSlice } from "@reduxjs/toolkit";
import { Job } from "../../utils/DataType";

interface UserState {
  user: null | string;
  token: null | string;
  isLoading: boolean;
  isMember: boolean;
  jobs: Job[];
  success: boolean;
  editItem: Job | null;
  errMsg: null;
}

const info = localStorage.getItem("user");
let userData = info !== null ? JSON.parse(info) : "";

const initialState: UserState = {
  user: userData.user,
  token: userData.token,
  jobs: [],
  success: false,
  isLoading: false,
  isMember: false,
  editItem: null,
  errMsg: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    registerUser: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isMember = true;
      state.errMsg = null;
    },
    failedResponse: (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.errMsg = action.payload;
    },
    loginUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoading = false;
      state.isMember = true;
      state.errMsg = null;
    },
    createJob: (state) => {
      state.success = true;
      state.isLoading = false;
      state.errMsg = null;
    },
    getAllJobs: (state, action) => {
      state.jobs = action.payload;
      state.isLoading = false;
      state.success = true;
      // state.errMsg = null
    },
    getSingleJob: (state, action) => {
      state.editItem = action.payload;
      state.isLoading = false;
    },
    updateJob: (state, action) => {
      state.editItem = action.payload;
      state.isLoading = false;
    },
    actionComplete: (state) => {
      state.success = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isMember = false;
      state.jobs = [];
      state.errMsg = null;
    },
  },
});

export const {
  setLoading,
  registerUser,
  failedResponse,
  loginUser,
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  logout,
  actionComplete,
} = UserSlice.actions;
export default UserSlice.reducer;
