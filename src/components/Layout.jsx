import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
      {/* </Navbar> */}
    </>
  );
}

export default Layout;
