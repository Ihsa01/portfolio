import React, { useState } from "react";
import { HiX } from 'react-icons/hi';
import { FaBars, FaReact } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './styles.scss';

const data = [
    {
        label: 'home',
        to: '/'
    },
    {
        label: 'about',
        to: '/about'
    },
    {
        label: 'projects',
        to: '/projects'
    },
    {
        label: 'contact',
        to: '/contact'
    }

]

const Navbar = () => {
    const [toggleIcon, setToggleIcon] = useState(false);
    const handleToggleIcon = () => {
        setToggleIcon(!toggleIcon);
    };
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-container-logo">
                        Logo
                    </Link>
                    <ul className= {`navbar-container-menu ${toggleIcon? 'active' : "" } `}>
                        {data.map((item, key) => (
                            <li key={key} className="navbar-container-menu-item">
                                <Link className="navbar-container-menu-item-links" to={item.to}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="nav-icon" onClick={handleToggleIcon}>
                        {toggleIcon ? <HiX size={30} /> : <FaBars size={30} />}
                    </div>
                </div>
            </nav>

        </div>
    )
}
export default Navbar