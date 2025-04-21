import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  activeEvent: null,
  isLoading: false,
  error: null,
};

// Async thunk to fetch active event
export const fetchActiveEvent = createAsyncThunk(
  "events/fetchActiveEvent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/events/active-event", {
        withCredentials: true,
      });
      return response.data.event; // We only return the event object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

// Slice
const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchActiveEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activeEvent = action.payload;
        state.error = null;
      })
      .addCase(fetchActiveEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.activeEvent = null;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
