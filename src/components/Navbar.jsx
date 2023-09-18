import React from 'react'
import { Link } from 'react-router-dom'

 const Navbar = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/register"}>register</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;