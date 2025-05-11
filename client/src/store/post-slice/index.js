import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    posts: [],
    loading: false,
    error: null,
};

export const fetchLinkedInPosts = createAsyncThunk(
    'linkedin/fetchPosts',
    async () => {
        const response = await axios.get('http://localhost:5000/api/posts/linkedin-posts');
        return response.data;
    }
);

const linkedinSlice = createSlice({
    name: 'linkedin', // Correct name
    initialState,    // Use the correctly defined initialState
    reducers: {},    // You can add synchronous reducers here if needed
    extraReducers: (builder) => {
        builder
            .addCase(fetchLinkedInPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLinkedInPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchLinkedInPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default linkedinSlice.reducer;