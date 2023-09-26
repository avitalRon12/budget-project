import React from 'react'
import WorkerIncomeForm from '../components/WorkerIncomeForm'
import WorkerPurchaseForm from '../components/WorkerPurchaseForm'

const WorkerDashboard = () => {
  return (
    <>
      <div>
        <WorkerPurchaseForm/>
      </div>
      <div>
        <WorkerIncomeForm/>
      </div>
    </>
  )
}

export default WorkerDashboard