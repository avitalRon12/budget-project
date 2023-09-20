import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
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

  const onSubmitPay = (data) => {
    setPaymentData({
      number: data.number,
      name: data.name,
      expiry: data.expiry,
      cvv: data.cvv,
    });
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
          <div>
            <form onSubmit={handleSubmit(onSubmitPay)}>
              <input
                type="text"
                placeholder="Card Number"
                {...register("number", { required: true })}
              />

              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
              />

              <input
                type="text"
                placeholder="Expiry"
                {...register("expiry", {
                  required: true,
                  validate: (value) =>
                    isValidExpiry(value) || "Invalid expiry date",
                })}
              />
              {errors.expiry && (
                <span>Incorrect expiry date, try using 11/22 format</span>
              )}

              <input
                type="text"
                placeholder="3-digit CVV"
                {...register("cvv", {
                  required: true,
                  maxLength: 3,
                  minLength: 3,
                })}
              />
              {errors.cvv && <span>3 digit security code is required</span>}

              <button type="submit">Apply</button>
            </form>
          </div>
          <button onClick={closeModal}>close</button>
        </Modal>
      </div>
    </>
  );
};

export default PaymentModal;
