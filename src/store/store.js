import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";
import PostReducer from "../store/PostSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: PostReducer,
  },
});

export default store;
