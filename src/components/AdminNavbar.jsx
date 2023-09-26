import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router";
import "../Styles/Navbar.css"


const AdminNavbar = () => {
  const { loggedInUser, logout } = useContext(UserContext);
  return (
    <>
      <div className="navbar-cont">
        <span className="navbar-span">
          {loggedInUser &&
            `Hey ${loggedInUser.username.charAt(0).toUpperCase() +
            loggedInUser.username.slice(1)
            }`}
        </span>
        <ul className="navbar-ul">
          <li>
            <Link to={"/admin/adminDash"}>Dashboard</Link>
          </li>
          <li>
            <Link to={"/admin/adminCalendar"}>Calendar</Link>
          </li>
          <li>
            <Link to={"/admin/adminUsers"}>Users</Link>
          </li>
          <li>
            <Link to={"/admin/adminPurchase"}>Purchases</Link>
          </li>
          <li>
            <Link to={"/admin/adminIncome"}>Incomes</Link>
          </li>
        </ul>
          <button className="button"onClick={logout}>Logout</button>
      </div>
    </>
  );
};

export default AdminNavbar;
