import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { Link } from 'react-router-dom'

const WorkerNavbar = () => {
    const {loggedInUser, logout} = useContext(UserContext)
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
          <Link to={"/worker/workerDash"}>Dashboard</Link>
        </li>
        <li>
          <Link to={"/worker/workerPurchase"}>Purchases</Link>
        </li>
        <li>
          <Link to={"/worker/workerIncome"}>Incomes</Link>
        </li>
        <button onClick={logout}>Logout</button>
      </ul>
    </>
  )
}

export default WorkerNavbar