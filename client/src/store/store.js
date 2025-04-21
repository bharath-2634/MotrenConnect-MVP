import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import developerReducer from "./dev-slice";
import contributorReducer from "./con-slice";
import eventReducer from "./event-slice";


const store = configureStore({
    reducer : {
        auth : authReducer,
        developerEnroll : developerReducer,
        contributorEnroll : contributorReducer,
        event : eventReducer
    }
})

export default store;