import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = ({ user, setUser }) => {

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        });
    }

    const loggedOutLinks = () => {
        <div className='NavbarDiv'>
        </div>

    }

    const loggedInLinks = () => {
        return (
            <div className='NavbarDiv'>
                <Link to='/'>Home</Link>
                <Link to='/create'>Create</Link>
                <Link to='/latest'>Latest</Link>
                <button onClick={handleLogoutClick}>Logout</button>
            </div>
        )
    }


    return (

        <div>
            {user.id ? loggedInLinks() : loggedOutLinks()}
        </div>
    )
}

export default Navbar
