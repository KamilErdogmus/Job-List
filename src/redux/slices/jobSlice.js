import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  error: null,
  isLoading: false,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setJobs: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.jobs = action.payload;
    },
    createJobs: (state, action) => {
      state.jobs.push(action.payload);
    },
    deleteJobs: (state, action) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },
  },
});

export const { setLoading, setError, setJobs, createJobs, deleteJobs } =
  jobSlice.actions;

export default jobSlice.reducer;
