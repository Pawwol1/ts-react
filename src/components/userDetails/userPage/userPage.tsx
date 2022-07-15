import React, { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../userlist/userlist';
import "../userDetails.css";

interface IProps {
    user: User,
    totalUsers: number,
    formMsg: {
        toUser: string,
        title: string,
        message: string
    },
    formTitleError: boolean, 
    formMsgError: boolean, 
    emptySpaceError: boolean, 
    msgSent: boolean, 
    handleSubmit: (e: FormEvent) => void,
    handleTitleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleMsgChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

function UserPage({user, totalUsers, formMsg, formTitleError, formMsgError, emptySpaceError, msgSent, handleSubmit, handleTitleChange, handleMsgChange}: IProps) {

    const userNotFound: string = "User not found";
    const contactUser: string = `Contact with ${user?.first_name} ${user?.last_name}!`;
    const linkMsg: string = "Back to the main page";
    const titleLabel: string = "Title: ";
    const textareaPlaceholder: string = "Start typing...";
    const inputPlaceholder: string = "...";
    const btnMsg: string = "Send message";
    const titleErr : string = "The title must be 1 to 255 characters with no double spaces";
    const msgErr : string = "The message must be 4 to 500 characters with no double spaces";
    const emptySpaceErr: string = "The first character cannot be an empty space";
    const messageSent: string = "The message has been sent successfully";

    return (
        <>
        {user?.id && user?.id >= 1 && user?.id <= totalUsers
        ? <div className='userDetails_box'>
            <div className='userDetails_box--user'>
                <h3>{user?.first_name} {user?.last_name}</h3>
                {!user?.avatar
                    ? <img key={user?.avatar} src={user?.avatar} alt="No photo"/>
                    : <img key={user?.avatar} src={user?.avatar} alt="User image"/>
                 } 
            </div>
            <form className='userDetails_box--form' onSubmit={handleSubmit} autoComplete='off'>
                <h4 className="userDetails_box--form--contact">{contactUser}</h4>
                <label htmlFor="title" className="userDetails_box--form--title">
                    {titleLabel} 
                    <input type="text" id="title" value={formMsg.title} onChange={handleTitleChange} placeholder={inputPlaceholder}/>
                </label>
                {formTitleError && <p className="userDetails_box--form--error">{titleErr}</p>}
                {emptySpaceError && <p className="userDetails_box--form--error">{emptySpaceErr}</p>}
                <label htmlFor="message" className="userDetails_box--form--message">
                    <textarea name="message" id="message" value={formMsg.message} onChange={handleMsgChange} cols={25} rows={10} placeholder={textareaPlaceholder}/>
                </label>
                {formMsgError && <p className="userDetails_box--form--error">{msgErr}</p>}
                <button className='userDetails_box--form--button' type="submit" disabled={formTitleError || formMsgError}>{btnMsg}</button>
                {msgSent && <p className="userDetails_box--form--sent">{messageSent}</p>}
            </form>
          </div>
        : <p className="userDetails_notFound">
                {userNotFound}
          </p> }
          <Link to="/" className='userDetails_box--link'>{linkMsg}</Link>
        </>
    );
}

export default UserPage;