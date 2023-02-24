import { createSlice } from "@reduxjs/toolkit";
import { Job } from "../../utils/DataType";

interface UserState {
  user: null | string;
  token: null | string;
  isLoading: boolean;
  isMember: boolean;
  jobs: Job[];
  success: boolean;
  userAdded: null | string;
}

const info = localStorage.getItem("user");
const userData = info !== null ? JSON.parse(info) : "";

const initialState: UserState = {
  user: userData.name,
  token: userData.token,
  jobs: [],
  success: false,
  isLoading: false,
  isMember: false,
  userAdded: "",
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
      state.userAdded = action.payload;
      state.isMember = true;
    },
    failedResponse: (state) => {
      state.isLoading = false;
      state.success = false;
    },
    loginUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoading = false;
      state.isMember = true;
    },
    createJob: (state) => {
      state.success = true;
      state.isLoading = false;
    },
    getAllJobs: (state, action) => {
      state.jobs = action.payload;
      state.isLoading = false;
      state.success = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isMember = false;
      state.jobs = [];
    },
    actionComplete: (state) => {
      state.success = false;
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
  logout,
  actionComplete,
} = UserSlice.actions;
export default UserSlice.reducer;
