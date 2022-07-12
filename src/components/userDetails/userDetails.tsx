import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { User } from '../userlist/userlist';
import "./userDetails.css";

function UserDetails() {
    const [user, setUser] = useState<User>({
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        avatar: ""
    });
    const [totalUsers, setTotalUsers] = useState<number>(1);
    const [formMsg, setFormMsg] = useState({
        toUser: "",
        title: "",
        message: ""
    });
    const [formTitleError, setFormTitleError] = useState<boolean>(false);
    const [formMsgError, setFormMsgError] = useState<boolean>(false);
    const [emptySpaceError, setEmptySpaceError] = useState<boolean>(false);
    const [msgSent, setMsgSent] = useState<boolean>(false);
    const {userID} = useParams();

    useEffect(() => {
        const getSingleUser = async () => {
            const resp = await fetch(`https://reqres.in/api/users/${userID}`);
            if (!resp.ok) {
                const err = "User not Found";
                throw new Error(err);
            }
            const data = await resp.json();
            setUser(data.data);
        }
        getSingleUser();
    }, [userID]);

    useEffect(() => {
        const getTotalUsers = async () => {
            const resp = await fetch("https://reqres.in/api/users");
            if (!resp.ok) {
                const err = "Total users not Found";
                throw new Error(err);
            }
            const data = await resp.json();
            setTotalUsers(data.total);
        };
        getTotalUsers();
    }, []);

    useEffect(() => {
        if (formMsg.title || formMsg.message !== "") {
            setFormTitleError(formMsg.title.length < 1 || formMsg.title.length > 255 || formMsg.title.includes("  ")); 
            setFormMsgError(formMsg.message.length <= 4 || formMsg.message.length > 500 || formMsg.message.includes("  "));
            setEmptySpaceError(formMsg.title.split("").shift() === " " || formMsg.message.split("").shift() === " ")
        }
    }, [formMsg])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setFormMsg({
            toUser: "",
            title: "",
            message: ""
        });
        if (!!formMsg.title && !!formMsg.message) {
            setMsgSent(true);
        } 
    }

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormMsg(prev => {
            return {
                ...prev,
                toUser: `${user?.first_name} ${user?.last_name}`,
                title: e.target.value
            }
        });
        setMsgSent(false);
    }

    const handleMsgChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFormMsg(prev => {
            return {
                ...prev,
                message: e.target.value
            }
        });
        setMsgSent(false);
    }

    const userNotFound: string = "User not found";
    const contactUser: string = `Contact with ${user?.first_name} ${user?.last_name}!`;
    const linkMsg: string = "Back to the main page";
    const titleLabel: string = "Title: ";
    const textareaPlaceholder: string = "Start typing...";
    const btnMsg: string = "Send message";
    const titleErr : string = "The title must be 1 to 255 characters with no double spaces";
    const msgErr : string = "The message must be 4 to 500 characters with no double spaces";
    const emptySpaceErr: string = "The first character cannot be an empty space";
    const messageSent: string = "The message has been sent successfully";

    return (
        <>
        {user?.id >= 1 && user?.id <= totalUsers
        ? <div className='userDetails_box'>
            <div className='userDetails_box--user'>
                <h3>{user?.first_name} {user?.last_name}</h3>
                <img src={user?.avatar} alt="user avatar" />  
            </div>
            <form className='userDetails_box--form' onSubmit={handleSubmit} autoComplete='off'>
                <h4 className="userDetails_box--form--contact">{contactUser}</h4>
                <label htmlFor="title" className="userDetails_box--form--title">
                    {titleLabel} 
                    <input type="text" id="title" value={formMsg.title} onChange={handleTitleChange}/>
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

export default UserDetails;