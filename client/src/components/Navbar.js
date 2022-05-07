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
        <div className='navlinks'>
        </div>

    }

    const loggedInLinks = () => {
        return (
            <div className='navlinks'>
                <Link to='/'>Home</Link>
                <Link to='/create'>Create</Link>
                <Link to={`/users/${user.id}`}>My Musings</Link>
                <Link to='/latest'>Latest</Link>
                <Link to='/authors'>Authors</Link>
                <button onClick={handleLogoutClick}>Logout</button>

            </div>
        )
    }


    return (
        <div>

            <div className="navbar">
                {user.id ? loggedInLinks() : loggedOutLinks()}

            </div>
            <div className="double-border-nav">
            </div>
        </div>
    )
}

export default Navbar
