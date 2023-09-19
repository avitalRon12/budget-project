// import React from "react";
// import { useForm } from "react-hook-form";
// import { UserContext } from "../context/userContext";
// import { useContext } from "react";

// // const logout = () => {
// //     setLoggedInUser(null);
// //   }; need to add a logout button to the navbar + check how to save the user card
// //  information 
// // 
// const Payment = () => {
//   const { register, handleSubmit } = useForm();
//   const { addPaymentToUser } = useContext(UserContext);
//   const { loggedInUser } = useContext(UserContext);

//   if (loggedInUser) {
//     console.log(`The currently logged-in user is ${loggedInUser.username}`);
//   } else {
//     console.log("No user is currently logged in.");
//   }

//   const onSubmit = (data) => {
//     // Here, you should typically have a user identification, for example, username.
//     // Assuming you have the username, you can call:
//     const username = `${users.username}`; // Replace this with the actual user's username.
//     addPaymentToUser(username, data);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input
//           type="text"
//           placeholder="Card Number"
//           {...register("number", { required: true })}
//         />
//         <input
//           type="text"
//           placeholder="Name"
//           {...register("name", { required: true })}
//         />
//         <input
//           type="text"
//           placeholder="Expiry"
//           {...register("expiry", { required: true })}
//         />
//         <input
//           type="text"
//           placeholder="CVV"
//           {...register("cvv", { required: true })}
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Payment;
