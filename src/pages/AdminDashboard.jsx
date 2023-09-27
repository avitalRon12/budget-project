import React, { useContext } from "react";
import { Chart } from "react-google-charts";
import { UserContext } from "../context/userContext";
import "../Styles/AdminDashboard.css";

const AdminDashboard = () => {
  const { users, loggedInUser } = useContext(UserContext);
  const currentUser = users.find(
    (user) => user.username === loggedInUser.username
  );

  const getPurchaseChartData = () => {
    if (!currentUser || !currentUser.purchases) return [];

    // Temporary object to hold the totals for each category
    const categoryTotals = {};

    // Aggregate the purchases by category
    currentUser.purchases.forEach((purchase) => {
      if (categoryTotals[purchase.category]) {
        // Use the 'category' property here
        categoryTotals[purchase.category] += purchase.total;
      } else {
        categoryTotals[purchase.category] = purchase.total;
      }
    });

    // Convert the aggregated data into the format for Google Charts
    const data = [["Category", "Total"]];
    for (let category in categoryTotals) {
      data.push([category, categoryTotals[category]]);
    }

    return data;
  };

  const getIncomeChartData = () => {
    if (!currentUser || !currentUser.incomes) return [];

    // Temporary object to hold the totals for each category
    const incomeCategoryTotals = {};

    // Aggregate the incomes by category
    currentUser.incomes.forEach((income) => {
      if (incomeCategoryTotals[income.category]) {
        // Use the 'category' property here
        incomeCategoryTotals[income.category] += income.incomeAmount;
      } else {
        incomeCategoryTotals[income.category] = income.incomeAmount;
      }
    });

    // Convert the aggregated data into the format for Google Charts
    const data = [["Category", "Amount"]];
    for (let category in incomeCategoryTotals) {
      data.push([category, incomeCategoryTotals[category]]);
    }

    return data;
  };

  const totalPurchases = () => {
    let total = 0;

    if (currentUser && currentUser.purchases) {
      currentUser.purchases.forEach((purchase) => {
        total += purchase.total; // assuming each purchase has a 'total' field
      });
    }

    return total;
  };

  const totalIncomes = () => {
    let total = 0;

    if (currentUser && currentUser.incomes) {
      currentUser.incomes.forEach((income) => {
        total += income.incomeAmount; // assuming each income has an 'incomeAmount' field
      });
    }

    return total;
  };
  const getBarChartData = () => {
    return [
      ["Type", "Amount", { role: "style" }],
      ["Expenses", totalPurchases(), "red"],
      ["Incomes", totalIncomes(), "green"],
    ];
  };
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="pie-charts-container">
        <Chart
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={getPurchaseChartData()}
          options={{
            title: "Purchase Distribution",
            backgroundColor: '#f8f9fa',
            pieHole: 0.4, 
            colors: ["#FF6F61", "#6B5B95", "#88D498", "#5F67FF"], 
            titleTextStyle: {
              color: "#444",
              fontSize: 20,
              bold: false,
            },
            height: 300,
            width: 300,
            legend: {
              position: "bottom",
              textStyle: {
                color: "gray",
                fontSize: 11,
              },
            },
            
          }}
        />
        <Chart
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={getIncomeChartData()}
          options={{
            title: "Purchase Distribution",
            backgroundColor: '#f8f9fa',
            pieHole: 0.4,
            colors: ["#FF6F61", "#6B5B95", "#88D498", "#5F67FF"],
            titleTextStyle: {
              color: "#444",
              fontSize: 20,
              bold: false,
            },
            height: 300,
            width: 300,
            legend: {
              position: "bottom",
              textStyle: {
                color: "gray",
                fontSize: 11,
              },
            },
          }}
        />
      </div>
      <div className="bar-charts-container ">
        <Chart
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={getBarChartData()}
          options={{
            width: 300,
            height: 200,
            title: "Income vs Expense",
            backgroundColor: '#f8f9fa',
            hAxis: {
              title: "Type",
              textStyle: {
                color: "#333",
                fontSize: 12,
              },
            },
            legend: {
              position: 'none',
              width: 0,
              height: 0,
            },
            vAxis: {
              title: "Amount ₪",
              textStyle: {
                color: "#333",
                fontSize: 12,
              },
              gridlines: {
                count: 5, 
                color: "#A4A4A4",
              },
            },
            colors: ["#FF6F61", "#88D498"],
            titleTextStyle: {
              alignment: 'center',
              color: "#444",
              fontSize: 20,
              bold: false,
            },
            annotations: {
              alwaysOutside: false,
              highContrast: true,
              textStyle: {
                fontSize: 0, // Set font size to 0 to effectively hide the annotations
                auraColor: "none",
              },
              boxStyle: {
                stroke: "#ccc",
                strokeWidth: 0,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
