import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
    return (
        <>
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