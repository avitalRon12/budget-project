import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import IncomeForm from '../components/IncomeForm';

const AdminIncome = () => {
    const { users, loggedInUser } = useContext(UserContext);

  return (
    <div>
        <IncomeForm></IncomeForm>

    </div>
  )
}

export default AdminIncome