import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App.jsx";
import store from "./store/store.js";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import PostForm from "./components/PostForm/PostForm.jsx";
import Post from "./components/Pages/Post.jsx";
import AllPosts from "./components/AllPosts.jsx";
import Home from "./components/Home.jsx";
import EditPost from "./components/EditPost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    //   children: [
    //     {
    //       path: "/",
    //       element: <Home />,
    //     },
    //     {
    //       path: "/login",
    //       element: (
    //         < ={false}>
    //           <Login />
    //         </>   //       ),
    //     },
    //     {
    //       path: "signup",
    //       element: (
    //         < ={false}>
    //           <SignUp />
    //         </>   //       ),
    //     },
    //     {
    //       path: "/add-post",
    //       element: (
    //
    //           <PostForm />
    //         </>   //       ),
    //     },
    //     {
    //       path: "post/:postId",
    //       element: <Post />,
    //     },
    //     {
    //       path: "all-posts",
    //       element: (
    //
    //           <AllPosts />
    //         </>   //       ),
    //     },
    //     {
    //       path: "edit-post/:postId",
    //       element: (
    //
    //           <EditPost />
    //         </>   //       ),
    //     },
    // ],

    /////

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "/add-post",
        element: <PostForm />,
      },
      {
        path: "post/:postId",
        element: <Post />,
      },
      {
        path: "all-posts",
        element: <AllPosts />,
      },
      {
        path: "edit-post/:postId",
        element: <EditPost />,
      },
    ],
  },
]);
// console.log(router);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
