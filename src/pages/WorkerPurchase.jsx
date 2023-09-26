import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import WorkerPurchaseForm from '../components/WorkerPurchaseForm'

const WorkerPurchase = () => {
  const { users } = useContext(UserContext)

  return (
    <>
      <div>
        <h1>Hi! This is your purchases page</h1>
        <h2>Here you can add purchases from different sources</h2>
      </div>
      <div>
        <WorkerPurchaseForm />
      </div>
    </>
  )
}

export default WorkerPurchase