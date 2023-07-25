import { useSelector } from "react-redux/es/hooks/useSelector";

import { Navigate, Outlet } from "react-router";
import Navbar from "./layouts/Navbar";

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return !isLoggedIn ? (
    <Navigate to="/login"></Navigate>
  ) : (
    <>
      <Navigate to="/home"></Navigate>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
}

export default App;
