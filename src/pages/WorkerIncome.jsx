import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import IncomeForm from '../components/IncomeForm';

const WorkerIncome = () => {
  const { users, loggedInUser, currentUserIndex } = useContext(UserContext);
  console.log(users.incomes);

  return (
    <>
      <div>
        <h1>Hi! This is your income page</h1>
        <h2>Here you can add income from different sources</h2>
      </div>
      <div>
        <IncomeForm />
      </div>
      
    </>
  )
}

export default WorkerIncome