import React, { useContext } from 'react'
import PurchaseForm from '../components/PurchaseForm'
import { UserContext } from '../context/userContext'

const AdminPurchase = () => {
  const { users } = useContext(UserContext)

  return (
    <>
      <div>
        <h1>Hi! This is your purchases page</h1>
        <h2>Here you can add purchases from different sources</h2>
      </div>
      <div>
        <PurchaseForm />
      </div>
    </>
  )
}

export default AdminPurchase