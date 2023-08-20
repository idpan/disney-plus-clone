import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/app/store.js";
// component
import App from "./App.jsx";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Originals from "./pages/Originals/Originals";
import Login from "./pages/Login/Login";
// style
import "/src/styles/index.css";
import Detail from "./pages/Detail/Detail.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/originals" element={<Originals />}></Route>
        <Route path="/series" element={<Series />}></Route>
        <Route path="/detail/:mediaType/:id" element={<Detail />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
    </>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
