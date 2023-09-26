import React, { useContext } from "react";
import PurchaseForm from "../components/PurchaseForm";
import { UserContext } from "../context/userContext";

const AdminPurchase = () => {
  const { users, loggedInUser,setUsers } = useContext(UserContext);
  const currentUserIndex = loggedInUser
    ? users.findIndex((user) => user.username === loggedInUser.username)
    : -1;

  const deleteBtn = (purchaseIndex) => {
    if (currentUserIndex === -1) return; // If no user is found, return early

    // Clone the users array so as not to mutate state directly
    const newUsers = [...users];

    // Remove the purchase from the user's purchases array
    newUsers[currentUserIndex].purchases.splice(purchaseIndex, 1);

    // Update users in context (assuming you have a setter for users in your context)
    setUsers(newUsers);

    // Update the localStorage with the new users array
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  return (
    <>
      <div>
        <h1>Hi! This is your purchases page</h1>
        <h2>Here you can add purchases from different sources</h2>
      </div>
      <div>
        <PurchaseForm />
      </div>
      <div>
        <h1>Purchase History</h1>
        <ul>
          {currentUserIndex !== -1 &&
            users[currentUserIndex].purchases.map((purchases, index) => (
              <li key={index}>
                <p>
                  {purchases?.purchaseName} - {purchases?.total} ₪
                </p>
                <button onClick={() => deleteBtn(index)}>delete</button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default AdminPurchase;
