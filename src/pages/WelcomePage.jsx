import React from 'react'
import { Link } from 'react-router-dom'
import "../Styles/WelcomePage.css"

const WelcomePage = () => {
    return (
        <>
            <div className='welcome-cont'>
                <div className='welcome-cont-small'>
                    <h1>Welcome!</h1>
                    <div className='welcome-text'>
                        <div>
                            <h3>Already have an account?</h3>
                            <Link to={"/login"} >Log In</Link>
                        </div>
                        <div>
                            <h3>Want to work with us?</h3>
                            <Link to={"/aboutUs"} >Make some money</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WelcomePage