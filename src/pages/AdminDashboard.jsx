import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'

const AdminDashboard = () => {
    const { users, loggedInUser } = useContext(UserContext);
    
    const totalPurchases = () => {
        let total = 0;
        users.forEach(user => {
            if(user.purchases) {
              user.purchases.forEach(purchase => {
                total += purchase.total; // assuming each purchase has a 'total' field
              });
            }
          });
        return total;
    }
    const totalIncomes = () => {
      let total = 0;
      users.forEach(user => {
          if(user.incomes) {
            user.incomes.forEach(income => {
              total += income.incomeAmount; // assuming each purchase has a 'total' field
            });
          }
        });
      return total;
  }
    
    return (
        <>
            <h1>Total Expenses = {totalPurchases()}</h1>
            <h1>Total Incomes = {totalIncomes()}</h1>
        </>
    )
}

export default AdminDashboard