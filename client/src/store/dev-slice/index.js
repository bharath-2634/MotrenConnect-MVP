import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isSubmitting: false,
  isSubmitted: false,
  error: null,
  developerData: null,
};

// 🔁 Async thunk for developer submission
export const submitDeveloper = createAsyncThunk(
  "developerEnroll/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/developerEnroll/submit",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 🧠 Developer Slice
const developerSlice = createSlice({
  name: "developerEnroll",
  initialState,
  reducers: {
    resetDeveloperState: (state) => {
      state.isSubmitting = false;
      state.isSubmitted = false;
      state.error = null;
      state.developerData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitDeveloper.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(submitDeveloper.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.isSubmitted = true;
        state.developerData = action.payload.data;
        state.error = null;
      })
      .addCase(submitDeveloper.rejected, (state, action) => {
        state.isSubmitting = false;
        state.isSubmitted = false;
        state.error = action.payload?.message || "Submission failed";
      });
  },
});

export const { resetDeveloperState } = developerSlice.actions;

export default developerSlice.reducer;
