import React from 'react';
import { Link } from 'react-router-dom';
import './pageNotFound.css'

function PageNotFound() {

    const notFound: string = "Page not Found";
    const returnToMain: string = "Return to the main page";

    return (
        <div className="pageNotFound_box">
            <h2 className="pageNotFound_box--title">{notFound}</h2>
            <Link to="/" className="pageNotFound_box--link">{returnToMain}</Link>
        </div>
    );
}

export default PageNotFound;