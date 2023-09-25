import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router";


const AdminNavbar = () => {
  const { loggedInUser, logout } = useContext(UserContext);
  return (
    <>
      <h1>
        {loggedInUser &&
          `Hey ${
            loggedInUser.username.charAt(0).toUpperCase() +
            loggedInUser.username.slice(1)
          }`}
      </h1>
      <ul>
        <li>
          <Link to={"/admin/adminDash"}>Dashboard</Link>
        </li>
        <li>
          <Link to={"/admin/adminRequests"}>Requests</Link>
        </li>
        <li>
          <Link to={"/admin/adminCalendar"}>Calendar</Link>
        </li>
        <li>
          <Link to={"/admin/adminUsers"}>Users Management</Link>
        </li>
        <li>
          <Link to={"/admin/adminPurchase"}>Purchase info</Link>
        </li>
        <li>
          <Link to={"/admin/adminIncome"}>Income info</Link>
        </li>
        <button onClick={logout}>Logout</button>
      </ul>
    </>
  );
};

export default AdminNavbar;
