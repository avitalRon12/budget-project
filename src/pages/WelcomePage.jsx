import React from 'react';
import { Link } from 'react-router-dom';
import "../Styles/WelcomePage.css";

const WelcomePage = () => {
    return (
        <div className='welcome-container'>
            <div className='content-box'>
                <h1 className='welcome-header'>Welcome!</h1>
                <div className='action-box'>
                    <div className='action-item'>
                        <h3>Already have an account?</h3>
                        <Link className='action-link' to="/login">Log In</Link>
                    </div>
                    <div className='action-item'>
                        <h3>Want to work with us?</h3>
                        <Link className='action-link' to="/aboutUs">Make some money</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage;
