import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import developerReducer from "./dev-slice";


const store = configureStore({
    reducer : {
        auth : authReducer,
        developerEnroll : developerReducer
    }
})

export default store