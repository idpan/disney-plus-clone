import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// component
import App from "./App.jsx";
import Search from "./pages/Search/Search";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Originals from "./pages/Originals/Originals";
import Detail from "./pages/Detail/Detail.jsx";
// style
import "/src/styles/index.css";
import Watch from "./pages/Watch/Watch.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/originals" element={<Originals />}></Route>
        <Route path="/series" element={<Series />}></Route>
        <Route path="/detail/:mediaType/:id" element={<Detail />}></Route>
      </Route>
      <Route path="/watch/:video_key" element={<Watch />}></Route>
    </>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
