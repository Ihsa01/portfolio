
import React from "react";
import { Link } from "react-router-dom";
import './ErrorPage.css'

const ErrorPage = () => {
    return (
        <div className="error-page">
            <h2>Oops! Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <Link to="/">Go to Home Page</Link>
        </div>
    );
};

export default ErrorPage;
