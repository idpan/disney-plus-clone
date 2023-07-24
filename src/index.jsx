import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/app/store.js";
// component
import App from "./App.jsx";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Originals from "./pages/Originals";
import Login from "./pages/Login";
// style
import "/src/assets/styles/index.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/profile", element: <Profile></Profile> },
      { path: "/search", element: <Search /> },
      { path: "/home", element: <Home></Home> },
      { path: "/movies", element: <Movies></Movies> },
      { path: "/series", element: <Series></Series> },
      { path: "/originals", element: <Originals></Originals> },
    ],
  },
  { path: "/login", element: <Login /> },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
