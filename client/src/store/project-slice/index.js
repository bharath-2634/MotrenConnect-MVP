import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  project: [],       
  loading: false,
  error: null,
  success: false,
};

export const createProject = createAsyncThunk(
  "project/createProject",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/project/create", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const fetchProjectsByUser = createAsyncThunk(
  "project/getProjects",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/project/getProjects/${userId}`);
      return response.data.projects;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch projects");
    }
  }
);


const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    resetProjectState: (state) => {
      state.loading = false;
      state.project = [];
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.project.push(action.payload.project); // append to list
        state.success = true;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error submitting project";
      })
      .addCase(fetchProjectsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload; // overwrite project array
        state.success = true;
      })
      .addCase(fetchProjectsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export const { resetProjectState } = projectSlice.actions;
export default projectSlice.reducer;
