import React, { useContext } from 'react'
import { UserContext } from '../context/userContext';
import WorkerNavbar from './WorkerNavbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const WorkerLayout = () => {
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (loggedInUser == null) navigate("/error");

  return (
    <>
      <WorkerNavbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default WorkerLayout