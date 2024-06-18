import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css'
import Icon from '../../Assets/Icon.jpg'

const Navbar = () => {
    return(
        <div className='nav'>
            <div className="nav-logo"></div>
            <img src={Icon} alt="Logo" className="nav-logo" />

            <ul className = "nav-menu">
                <li>Home</li>
                <li>About</li>
                <li className='nav-contact'><Link to="/contact">Contact</Link></li>
            </ul> 

        </div>
    )
}

export default Navbar 