import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import IncomeForm from '../components/IncomeForm';

const AdminIncome = () => {
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
      <div>
        <ul>
          
        </ul>
      </div>
    </>
  )
}

export default AdminIncome