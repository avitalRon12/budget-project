import React from 'react'
import WorkerIncomeForm from '../components/WorkerIncomeForm'
import WorkerPurchaseForm from '../components/WorkerPurchaseForm'
import "../Styles/WorkerDashboard.css"

const WorkerDashboard = () => {
  return (
    <div className='forms-cont'>
      <div className='w-purchase-form-cont'>
        <WorkerPurchaseForm/>
      </div>
      <div className='w-income-form-cont'>
        <WorkerIncomeForm/>
      </div>
    </div>
  )
}

export default WorkerDashboard