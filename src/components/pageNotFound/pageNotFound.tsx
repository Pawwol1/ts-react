import React from 'react';
import { Link } from 'react-router-dom';
import './pageNotFound.css'

function PageNotFound() {
    return (
        <div className="pageNotFound_box">
            <h2 className="pageNotFound_box--title">Page Not Found</h2>
            <Link to="/" className="pageNotFound_box--link">Return to main page</Link>
        </div>
    );
}

export default PageNotFound;