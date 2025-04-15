import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated : false,
    isLoading : false,
    user:null
}

// export const registerUser = createAsyncThunk(
//     "/auth/register",
//     async (formData) => {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         formData,
//         {
//           withCredentials: true,
//         }
//       );
//       const data = response.data;
//       if(data.success) {
//         localStorage.setItem("token",data.token);
//       }
//       return response.data;
//     }
// );

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
      try {
          const response = await axios.post(
              "http://localhost:5000/api/auth/register",
              formData,
              { withCredentials: true }
          );
          return response.data;
      } catch (error) {
          return rejectWithValue(error.response.data);
      }
  }
);


export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const googleLogin = createAsyncThunk(
  "auth/google",
  async (token) => {
    // console.log("Slice Enter", token);
    
    const response = await axios.post(
      "http://localhost:5000/api/auth/google",  // ✅ Corrected endpoint
      { token }, // Send token inside request body
      { withCredentials: true }
    );

    console.log("slice", response.data);
    const data = response.data;
    if(data.success) {
      localStorage.setItem("token",data.token);
    }
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    const data = response.data;
    
    if(data.success) {
      localStorage.removeItem("token");
    }

    return response.data;
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",

  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/auth/check-auth",
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
    console.log("data from Auth Slice",response.data);
    return response.data;
  }
);

export const fetchUserById = createAsyncThunk(
  "/auth/fetchUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/user/${userId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "/auth/updateUser",
  async (updatedUser, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/updateUser",
        { user: updatedUser },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setUser:(state,action)=>{
        }
    },
    extraReducers : (builder)=>{
        builder
        .addCase(registerUser.pending, (state)=>{
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success;
        }).addCase(registerUser.rejected, (state,action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false; 
        })
        .addCase(loginUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          console.log(action);
          state.isLoading = false;
          state.user = action.payload.success ? action.payload.user : null;
          state.isAuthenticated = action.payload.success;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
        })
        .addCase(googleLogin.pending, (state)=>{
          state.isLoading = true;
        })
        .addCase(googleLogin.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload.success ? action.payload.user : null;
          state.isAuthenticated = action.payload.success;
        })
        .addCase(googleLogin.rejected, (state, action) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
        })
        .addCase(checkAuth.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
          console.log("checkAuth",action.payload);
          state.isLoading = false;
          state.user = action.payload.success ? action.payload.user : null;
          state.isAuthenticated = action.payload.success;
        })
        .addCase(checkAuth.rejected, (state, action) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
        })
        .addCase(fetchUserById.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchUserById.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload.success ? action.payload.user : null;
        })
        .addCase(fetchUserById.rejected, (state) => {
          state.isLoading = false;
          state.user = null;
        })
        .addCase(updateUserProfile.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
          state.isLoading = false;
          if (action.payload.success) {
            state.user = action.payload.user; // update user in state
          }
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
          state.isLoading = false;
          // optionally handle error messages
        })
        ;
        
    }

})

export const {setUser} = authSlice.actions;

export default authSlice.reducer;