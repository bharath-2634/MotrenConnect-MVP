import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import developerReducer from "./dev-slice";
import contributorReducer from "./con-slice";
import eventReducer from "./event-slice";
import projectReducer from "./project-slice";
import postReducer from "./post-slice";


const store = configureStore({
    reducer : {
        auth : authReducer,
        developerEnroll : developerReducer,
        contributorEnroll : contributorReducer,
        event : eventReducer,
        project : projectReducer,
        linkedin : postReducer
    }
})

export default store;