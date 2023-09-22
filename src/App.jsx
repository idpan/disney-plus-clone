import { Navigate, Outlet } from "react-router";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <>
      <Layout>
        <Outlet></Outlet>
      </Layout>
    </>
  );
}

export default App;
