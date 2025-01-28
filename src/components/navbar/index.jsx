import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import "./styles.scss";

const data = [
    {
        label: "home",
        to: "/",
    },
    {
        label: "about",
        to: "/about",
    },
    {
        label: "projects",
        to: "/projects",
    },
    {
        label: "contact",
        to: "/contact",
    },
];

const Navbar = () => {
    const [toggleIcon, setToggleIcon] = useState(false);
    const location = useLocation();

    const handleToggleIcon = () => {
        setToggleIcon(!toggleIcon);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-container-logo">
                        <img src={logo} alt="Logo" className="navbar-logo-image" />
                    </Link>

                    <ul className={`navbar-container-menu ${toggleIcon ? "active" : ""}`}>
                        {data.map((item, key) => (
                            <li
                                key={key}
                                className={`navbar-container-menu-item ${
                                    location.pathname === item.to ? "active" : ""
                                }`}
                            >
                                <Link
                                    className="navbar-container-menu-item-links"
                                    to={item.to}
                                    onClick={() => setToggleIcon(false)}
                                >
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
    );
};

export default Navbar;
