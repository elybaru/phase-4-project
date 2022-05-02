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
    return (
        <div>
            <div className='NavbarDiv'>
                <Link to='/'>Home</Link>
                <button onClick={handleLogoutClick}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar
