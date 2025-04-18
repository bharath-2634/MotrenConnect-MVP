import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import developerReducer from "./dev-slice";
import contributorReducer from "./con-slice";


const store = configureStore({
    reducer : {
        auth : authReducer,
        developerEnroll : developerReducer,
        contributorEnroll : contributorReducer
    }
})

export default store