import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  post: {},
};

const PostReducer = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setPosts: (state, action) => {
      console.log(state, action);
      return {
        ...state,
        posts: action.payload,
      };
    },
    setPost: (state, action) => {
      return {
        ...state,
        post: action.payload,
      };
    },
  },
});

export const {setPosts, setPost} = PostReducer.actions;
export default PostReducer.reducer;
