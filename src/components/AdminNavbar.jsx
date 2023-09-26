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
              <Link to={"/admin/adminDash"} className="button">Dashboard</Link>
            </li>
            <li>
              <Link to={"/admin/adminCalendar"} className="button">Calendar</Link>
            </li>
            <li>
              <Link to={"/admin/adminUsers"} className="button">Users</Link>
            </li>
            <li>
              <Link to={"/admin/adminPurchase"} className="button">Purchases</Link>
            </li>
            <li>
              <Link to={"/admin/adminIncome"} className="button">Incomes</Link>
            </li>
          </ul>
        </div>
        <button onClick={logout} className="logout-button">Logout</button>
      </div>
    </>
  );
};

export default AdminNavbar;
