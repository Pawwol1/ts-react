import React from 'react';
import { Link } from 'react-router-dom';
import "./userDetails.css";

function UserDetails() {
    return (
        <div className='userDetails_box'>
            <div className='userDetails_box--user'>
                <h2>Jan Kowalski</h2>
                <p>Miejsce na avatar</p>
            </div>
            <Link to="/" className='userDetails_box--link'>Back to main page</Link>
            <form className='userDetails_box--form' autoComplete='off'>
                <h3 className="userDetails_box--form--contact">Contact with "Jan Kowalski"!</h3>
                <label htmlFor="title" className="userDetails_box--form--title">
                    Tytuł: 
                    <input type="text" id="title" />
                </label>
                <label htmlFor="message" className="userDetails_box--form--message">
                    <textarea name="message" id="message" cols={30} rows={10} placeholder="Zacznij pisać...">
                    </textarea>
                </label>
                <button type="submit">Wyślij</button>
            </form>
        </div>
    );
}

export default UserDetails;