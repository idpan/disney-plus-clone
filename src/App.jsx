import { useSelector } from "react-redux/es/hooks/useSelector";

import { Navigate, Outlet } from "react-router";
import Layout from "./components/Layout";

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return !isLoggedIn ? (
    <Navigate to="/login"></Navigate>
  ) : (
    <>
      <Navigate to="/home"></Navigate>
      <Layout>
        <Outlet></Outlet>
      </Layout>
    </>
  );
}

export default App;
