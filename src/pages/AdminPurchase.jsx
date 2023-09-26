import React, { useContext } from "react";
import PurchaseForm from "../components/PurchaseForm";
import { UserContext } from "../context/userContext";

const AdminPurchase = () => {
  const { users, loggedInUser, setUsers } = useContext(UserContext);
  const currentUserIndex = loggedInUser
    ? users.findIndex((user) => user.username === loggedInUser.username)
    : -1;

  const deleteBtn = (purchaseIndex) => {
    if (currentUserIndex === -1) return;
    const newUsers = [...users];
    newUsers[currentUserIndex].purchases.splice(purchaseIndex, 1);
    setUsers(newUsers);
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
          {currentUserIndex !== -1 && users[currentUserIndex]?.purchases && users[currentUserIndex]?.purchases.length > 0 ? (
            users[currentUserIndex].purchases.map((purchase, index) => (
              <li key={index}>
                <div>
                  <p>Item name: {purchase?.purchaseName}</p>
                  <p>Total Price: {purchase?.total} ₪</p>
                </div>
                <button onClick={() => deleteBtn(index)}>delete</button>
              </li>
            ))
          ) : (
            <p>You have no history</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default AdminPurchase;
