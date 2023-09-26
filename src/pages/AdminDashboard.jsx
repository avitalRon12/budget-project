import React, { useContext } from "react";
import { Chart } from "react-google-charts";
import { UserContext } from "../context/userContext";

const AdminDashboard = () => {
  const { users, loggedInUser } = useContext(UserContext);
  const currentUser = users.find((user) => user.username === loggedInUser.username);
  
  const getPurchaseChartData = () => {
    if (!currentUser || !currentUser.purchases) return [];
    
    // Header for the chart data
    const data = [["Purchase Name", "Total"]];
    
    // Pushing purchase data into our data array
    currentUser.purchases.forEach((purchase) => {
      data.push([purchase.purchaseName, purchase.total]);
    });
    
    return data;
  };
  const getIncomeChartData = () => {
    if (!currentUser || !currentUser.purchases) return [];
    
    // Header for the chart data
    const data = [["Income Name", "Amount"]];
    
    // Pushing purchase data into our data array
    currentUser.incomes.forEach((income) => {
      data.push([income.incomeName, income.incomeAmount]);
    });
    
    return data;
  };
  
  
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
  const getBarChartData = () => {
    return [
      ['Type', 'Amount', { role: 'style' }],
      ['Expenses', totalPurchases(), 'red'],
      ['Incomes', totalIncomes(), 'green']
    ];
  };
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={getPurchaseChartData()}
        options={{
          title: "Purchases Distribution",
        }}
      />
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={getIncomeChartData()}
        options={{
          title: "Incomes Distribution",
        }}
      />
      <Chart
  width={"500px"}
  height={"300px"}
  chartType="ColumnChart"
  loader={<div>Loading Chart</div>}
  data={getBarChartData()}
  options={{
    title: "Income vs Expense",
    hAxis: {
      title: 'Type'
    },
    vAxis: {
      title: 'Amount ₪'
    },
    colors: ['red', 'green'],
    annotations: {
      alwaysOutside: false,
      highContrast: true,
      textStyle: {
        fontSize: 0,  // Set font size to 0 to effectively hide the annotations
        auraColor: 'none'
      },
      boxStyle: {
        stroke: '#ccc',
        strokeWidth: 0
      }
    }
  }}
/>

    
    </div>
  );
};

export default AdminDashboard;
