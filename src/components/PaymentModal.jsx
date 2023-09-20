import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'
import { UserContext } from '../context/userContext';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const PaymentModal = () => {
    const { addPaymentToUser } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmitPay = () => {
        addPaymentToUser(data.username, {
            number: data.number,
            name: data.name,
            expiry: data.expiry,
            cvv: data.cvv,
        });
    }

    const isValidExpiry = (expiry) => {
        const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if (!regex.test(expiry)) {
            return false;
        }
        const [month, year] = expiry.split("/");

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // getMonth returns 0-11
        const currentYear = currentDate.getFullYear() % 100; // get the last two digits

        const expMonth = parseInt(month, 10);
        const expYear = parseInt(year, 10);

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
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <div>
                <button onClick={openModal}>open modal</button>
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
                                    validate: (value) => isValidExpiry(value) || "Invalid expiry date",
                                })}
                            />
                            {errors.expiry && <span>Incorrect expiry date, try using 11/22 format</span>}

                            <input
                                type="text"
                                placeholder="3-digit CVV"
                                {...register("cvv", { required: true, maxLength: 3, minLength: 3 })}
                            />
                            {errors.cvv && <span>3 digit security code is required</span>}

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    <button onClick={closeModal}>close</button>

                </Modal>
            </div>
        </>
    )
}

export default PaymentModal