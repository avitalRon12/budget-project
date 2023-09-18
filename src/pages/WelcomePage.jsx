import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => {
    return (
        <>
            <h1>Welcome!</h1>
            <div>
                <h3>If your employer had given you an account</h3>
                <Link to={"/login"}>Log In</Link>
            </div>
            <div>
                <h3>If you are an employer and want to sign up</h3>
                <Link to={"/register"}>Create an account</Link>
            </div>
        </>
    )
}

export default WelcomePage