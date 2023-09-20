import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const AdminNavbar = () => {
    const { loggedInUser } = useContext(UserContext);
    return (
        <>
        <h1>{`Hey ${ loggedInUser.username.charAt(0).toUpperCase()+loggedInUser.username.slice(1) }`}</h1>
            <ul>
                <li>
                    <Link to={'/admin/adminDash'}>Dashboard</Link>
                </li>
                <li>
                    <Link to={'/admin/adminRequests'}>Requests</Link>
                </li>
                <li>
                    <Link to={'/admin/adminCalendar'}>Calendar</Link>
                </li>
                <li>
                    <Link to={'/admin/adminUsers'}>Users Management</Link>
                </li>
            </ul>
        </>
    )
}

export default AdminNavbar