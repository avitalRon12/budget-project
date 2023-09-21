import React, { useContext } from "react";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const AdminLayout = () => {
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (loggedInUser==null) navigate("/error");
  return (
    <>
      <AdminNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default AdminLayout;
