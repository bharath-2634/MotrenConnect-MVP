import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isSubmitting: false,
  isSubmitted: false,
  error: null,
  developerData: null,
};

// 🔁 Async thunk for developer submission
export const submitContributor = createAsyncThunk(
  "contributorEnroll/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/contributorEnroll/submit",
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
const contributorSlice = createSlice({
  name: "contributorEnroll",
  initialState,
  reducers: {
    resetContributorState: (state) => {
      state.isSubmitting = false;
      state.isSubmitted = false;
      state.error = null;
      state.developerData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContributor.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(submitContributor.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.isSubmitted = true;
        state.developerData = action.payload.data;
        state.error = null;
      })
      .addCase(submitContributor.rejected, (state, action) => {
        state.isSubmitting = false;
        state.isSubmitted = false;
        state.error = action.payload?.message || "Submission failed";
      });
  },
});

export const { resetContributorState } = contributorSlice.actions;

export default contributorSlice.reducer;
