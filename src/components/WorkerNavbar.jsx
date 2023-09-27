import React, { useContext } from 'react'
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import "../Styles/Navbar.css"

const WorkerNavbar = () => {
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
                <h2>Manage expenses and incomes</h2>
                <button className="button" onClick={logout}>Logout</button>
            </div>
        </>
    )
}

export default WorkerNavbar