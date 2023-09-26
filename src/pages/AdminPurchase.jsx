import React, { useContext } from "react";
import PurchaseForm from "../components/PurchaseForm";
import { UserContext } from "../context/userContext";
import "../Styles/Purchases.css";

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
    <div className="admin-purchase">
      <div className="purchase-heading">
        <h1>Hi! This is your purchases page</h1>
        <h2>Here you can add purchases from different sources</h2>
      </div>
      <div className="purchase-form">
        <PurchaseForm />
      </div>
      <div className="purchase-history">
        <h1>Purchase History</h1>
        <ul className="purchase-list">
          {currentUserIndex !== -1 && users[currentUserIndex]?.purchases && users[currentUserIndex]?.purchases.length > 0 ? (
            users[currentUserIndex].purchases.map((purchase, index) => (
              <li className="purchase-item" key={index}>
                <div className="purchase-info">
                  <p>Item name: {purchase?.purchaseName}</p>
                  <p>Total Price: {purchase?.total} ₪</p>
                </div>
                <button className="delete-button" onClick={() => deleteBtn(index)}>Delete</button>
              </li>
            ))
          ) : (
            <p>You have no history</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminPurchase;
