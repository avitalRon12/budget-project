import React, { useContext } from 'react'
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';

const WorkerNavbar = () => {
    const { loggedInUser, logout } = useContext(UserContext);

    return (
        <>
            <h1>
                {loggedInUser &&
                    `Hey ${loggedInUser.username.charAt(0).toUpperCase() +
                    loggedInUser.username.slice(1)
                    }`}
            </h1>
            <h2>Manage expenses and incomes</h2>
            <button onClick={logout}>Logout</button>

        </>
    )
}

export default WorkerNavbar