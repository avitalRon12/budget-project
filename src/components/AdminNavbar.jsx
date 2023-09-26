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
        
        <div className="navbar-ul-cont">
          <ul className="navbar-ul">
          <li>
            <Link to={"/admin/adminDash"} className="button1">Dashboard</Link>
          </li>
          <li>
            <Link to={"/admin/adminCalendar"} className="button1">Calendar</Link>
          </li>
          <li>
            <Link to={"/admin/adminUsers"} className="button1">Users</Link>
          </li>
          <li>
            <Link to={"/admin/adminPurchase"} className="button1">Purchases</Link>
          </li>
          <li>
            <Link to={"/admin/adminIncome"} className="button1">Incomes</Link>
          </li>
        </ul>
        </div>
          <button className="button"onClick={logout}>Logout</button>
      </div>
    </>
  );
};

export default AdminNavbar;
