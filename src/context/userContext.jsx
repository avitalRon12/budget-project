import { createContext, useState } from "react";

export const UserContext = createContext({
  users: [],
  setUsers: () => {},
  createNewUser: () => {},
  login: () => {},
  loggedInUser: null,
  setLoggedInUser: () => {},
  addPaymentToUser: () => {}
});

const [loggedInUser, setLoggedInUser] = useState(null);
// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const createNewUser = (newUser) => {
    setUsers((prev) => {
      if (prev.some((user) => user.username === newUser.username)) {
        return prev;
      }
      localStorage.setItem("users", JSON.stringify([...prev, newUser]));
      return [...prev, newUser];
    });
  };

  const login = ({ username, password }) => {
    const userExists = users.find((user) => user.username === username);
    if (!userExists) {
      return alert("Wrong credentials!");
    }
    const passwordMatch = userExists.password === password;
    if (!passwordMatch) {
      return alert("Wrong credentials!");
    }
    setLoggedInUser(userExists);
    return alert("Logged in!");
  };

  const addPaymentToUser = (username, paymentInfo) => {
    setUsers(prevUsers => {
      const newUsers = prevUsers.map(user => {
        if (user.username === username) {
          return {
            ...user,
            paymentInfo
          };
        }
        return user;
      });
      localStorage.setItem("users", JSON.stringify(newUsers));
      return newUsers;
    });
  };
  return (
    <UserContext.Provider value={{ users, setUsers, createNewUser, login,addPaymentToUser,loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;