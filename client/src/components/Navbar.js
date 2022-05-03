import React from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../constants'

const Navbar = ({ user, setUser }) => {

    function handleLogoutClick() {
        fetch(BASE_URL + "/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        });
    }

    const loggedInLinks = () => {
        <div className='NavbarDiv'>
        </div>

    }

    const loggedOutLinks = () => {
        <div className='NavbarDiv'>
            <Link to='/'>Home</Link>
            <button onClick={handleLogoutClick}>Logout</button>
        </div>

    }


    return (

        <div>

        </div>
    )
}

export default Navbar
