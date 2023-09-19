import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => {
    return (
        <>
            <h1>Welcome!</h1>
            <div>
                <h3>Already have an account?</h3>
                <Link to={"/login"}>Log In</Link>
            </div>
            <div>
                <h3>Want to work with us?</h3>
                <Link to={"/aboutUs"}>Make some money</Link>
            </div>
        </>
    )
}

export default WelcomePage