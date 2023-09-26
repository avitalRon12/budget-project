import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { UserContext } from "../context/userContext";
Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const PaymentModal = ({ setIsPaymentComplete, setPaymentData }) => {
  const { addPaymentToUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [creditCardData, setCreditCardData] = useState({
    cvv: '',
    expiry: '',
    name: '',
    number: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCreditCardData({
      ...creditCardData,
      [name]: value,
    });
  };

  const onSubmitPay = () => {
    setPaymentData(creditCardData);
    setIsPaymentComplete(true);
    closeModal();
  };
  

  const isValidExpiry = (expiry) => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!regex.test(expiry)) {
      return false;
    }
    let month, year;
    if (expiry.includes("/")) {
      [month, year] = expiry.split("/");
    } else {
      month = expiry.substring(0, 2);
      year = expiry.substring(2);
    }
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // getMonth returns 0-11
    const currentYear = currentDate.getFullYear() % 100; // get the last two digits

    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);
    console.log("Current Year:", currentYear, "Expiry Year:", expYear);
    console.log("Current Month:", currentMonth, "Expiry Month:", expMonth);
    
    if (
      expYear < currentYear ||
      (expYear === currentYear && expMonth < currentMonth)
    ) {
      return false;
    }
    return true;
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  
  function openModal(event) {
    event.preventDefault();
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  const validateCardNumber = (value) => {
    // Remove any non-digit characters from the card number
    const cardNumber = value.replace(/\D/g, '');
  
    // Perform the Luhn algorithm validation
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);
  
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
  
      sum += digit;
      shouldDouble = !shouldDouble;
    }
  
    // The card number is valid if the sum is divisible by 10
    return sum % 10 === 0;
  };
  
  const validateCardExpiry = (value) => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  
    if (!regex.test(value)) {
      return false;
    }
  
    const [month, year] = value.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
  
    const expiryYear = parseInt(year, 10);
    const expiryMonth = parseInt(month, 10);
  
    if (
      expiryYear < currentYear ||
      (expiryYear === currentYear && expiryMonth < currentMonth)
    ) {
      return false;
    }
  
    return true;
  };
  

  return (
    <>
      <div>
        <button type="button" onClick={openModal}>Payment Information</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Cards
            cvc={creditCardData.cvc}
            expiry={creditCardData.expiry}
            name={creditCardData.name}
            number={creditCardData.number}
          />
          <form onSubmit={handleSubmit(onSubmitPay)}>
            <input
              type="text"
              name="number"
              placeholder="Card Number"
              {...register("number", { 
                required: true,
                validate: value => validateCardNumber(value) || 'Invalid card number'
              })}
              onChange={handleInputChange}
            />
            {errors.number && <span>{errors.number.message}</span>}

            <input
              type="text"
              name="name"
              placeholder="Name"
              {...register("name", { required: true })}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="expiry"
              placeholder="Expiry MM/YY"
              {...register("expiry", {
                required: true,
                validate: value => validateCardExpiry(value) || 'Invalid expiry date'
              })}
              onChange={handleInputChange}
            />
            {errors.expiry && <span>{errors.expiry.message}</span>}

            <input
              type="text"
              name="cvv"
              placeholder="3-digit CVV"
              {...register("cvv", {
                required: true,
                maxLength: 3,
                minLength: 3,
              })}
              onChange={handleInputChange}
            />
            {errors.cvv && <span>{errors.cvv.message}</span>}

            <button type="submit">Apply</button>
          </form>
          <button onClick={closeModal}>close</button>
        </Modal>
      </div>
    </>
  );
};

export default PaymentModal;