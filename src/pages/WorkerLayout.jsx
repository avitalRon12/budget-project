import React, { useContext } from 'react'
import { UserContext } from '../context/userContext';

const WorkerLayout = () => {
    const { loggedInUser, logout } = useContext(UserContext);
  return (
    <div>WorkerLayout
         <button onClick={logout}>Logout</button>
    </div>
  )
}

export default WorkerLayout