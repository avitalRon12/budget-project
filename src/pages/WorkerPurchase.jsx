import React from 'react'
import PurchaseForm from '../components/PurchaseForm'

const WorkerPurchase = () => {
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

export default WorkerPurchase