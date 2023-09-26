import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import IncomeForm from '../components/IncomeForm';
import '../Styles/Incomes.css';

const AdminIncome = () => {
  const { users, loggedInUser, setUsers } = useContext(UserContext);
  const currentUserIndex = loggedInUser
    ? users.findIndex((user) => user.username === loggedInUser.username)
    : -1;

  const deleteBtn = (incomeIndex) => {
    if (currentUserIndex === -1) return; // If no user is found, return early

    // Clone the users array so as not to mutate state directly
    const newUsers = [...users];

    // Remove the income from the user's incomes array
    newUsers[currentUserIndex].incomes.splice(incomeIndex, 1);

    // Update users in context (assuming you have a setter for users in your context)
    setUsers(newUsers);

    // Update the localStorage with the new users array
    localStorage.setItem('users', JSON.stringify(newUsers));
  };

  return (
    <>
      <div className="admin-income">
        <div className='income-heading' > {/* Updated class name */}
          <h1>Hi! This is your income page</h1>
          <h2>Here you can add income from different sources</h2>
        </div>
        <div className="income-form"> {/* Updated class name */}
          <IncomeForm />
        </div>
        <div className="income-history"> {/* Updated class name */}
          <h1>Income History</h1>
          <ul>
            {currentUserIndex !== -1 && users[currentUserIndex].incomes && users[currentUserIndex].incomes.length > 0 ? (
              users[currentUserIndex].incomes.map((income, index) => (
                <li key={index} className="income-item"> {/* Updated class name */}
                  <p>
                    {income?.incomeName} - {income?.incomeAmount} ₪
                  </p>
                  <button className="delete-button" onClick={() => deleteBtn(index)}>delete</button> {/* Updated class name */}
                </li>
              ))
            ) : (
              <p>You have no income history</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminIncome;
