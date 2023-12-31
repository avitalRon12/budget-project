import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({
  users: [],
  setUsers: () => {  },
  createNewUser: () => {  },
  login: () => {  },
  loggedInUser: null,
  setLoggedInUser: () => { },
  addPaymentToUser: () => { },
});

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

    const [loggedInUser, setLoggedInUser] = useState(
      JSON.parse(localStorage.getItem("loggedInUser")) || null
    );

  const createNewUser = (newUser, parentUsername = null) => {
    console.log(newUser);
    let userCreated = true;
    setUsers((prev) => {
      if (loggedInUser && loggedInUser.username === newUser.username) {
        alert(
          "You can't use the same username as the currently logged-in admin."
        );
        userCreated = false;
        return prev;
      }

      if (prev.some((user) => user.username === newUser.username)) {
        alert(
          "Username already exists in users! Please choose a different one."
        );
        userCreated = false;
        return prev;
      }

      if (parentUsername) {
        const updatedUsers = prev.map((user) => {
          if (user.username === parentUsername) {
            const workers = user.workers || [];

            // Check if the username already exists in the workers list
            if (
              workers.some((worker) => worker.username === newUser.username)
            ) {
              alert(
                "Username already exists in workers! Please choose a different one."
              );
              userCreated = false;
              return user; // return the user without changes
            }

            workers.push(newUser);
            const updatedUser = { ...user, workers };
            if (loggedInUser && loggedInUser.username === user.username) {
              setLoggedInUser(updatedUser);
              localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
            }
           
            if (loggedInUser && loggedInUser.username === user.username) {
              setLoggedInUser(updatedUser);
              localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
            }

            return updatedUser;
          }
          return user;
        });
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return updatedUsers;
      }

      localStorage.setItem("users", JSON.stringify([...prev, newUser]));
      return [...prev, newUser];
    });
    return userCreated;
  };



  const login = ({ username, password }) => {
    const userExists = users.find((user) => user.username === username);

    if (userExists) {
      const passwordMatch = userExists.password === password;
      if (!passwordMatch) {
        return alert("Wrong password!");
      }
      setLoggedInUser(userExists);
      localStorage.setItem("loggedInUser", JSON.stringify(userExists));
      return;
    } else {
      // If it's not a main user, check if it's a worker
      for (let user of users) {
        if (user.workers) {
          const workerExists = user.workers.find(
            (worker) => worker.username === username
          );
          if (workerExists) {
            const passwordMatch = workerExists.password === password;
            if (!passwordMatch) {
              return alert("Wrong password!");
            }
            setLoggedInUser(workerExists);
            localStorage.setItem("loggedInUser", JSON.stringify(workerExists));
            return;
          }
        }
      }
      return alert("Wrong credentials!");
    }
  };

  const navigate = useNavigate();

  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
    navigate('/');
  };

  const addPaymentToUser = (username, paymentInfo) => {
    setUsers((prevUsers) => {
      const newUsers = prevUsers.map((user) => {
        if (user.username === username) {
          return {
            ...user,
            paymentInfo,
          };
        }
        return user;
      });
      localStorage.setItem("users", JSON.stringify(newUsers));
      return newUsers;
    });
  };
  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        createNewUser,
        login,
        logout,
        addPaymentToUser,
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
