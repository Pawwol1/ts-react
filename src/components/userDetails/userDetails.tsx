import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../userlist/userlist';
import "./userDetails.css";
import UserPage from './userPage/userPage';

function UserDetails() {
    const [user, setUser] = useState<User>({
        "id": 0,
        "email": "",
        "first_name": "",
        "last_name": "",
        "avatar": ""
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

    return (
        <>
            <UserPage 
            user={user} 
            totalUsers={totalUsers} 
            formMsg={formMsg} 
            formTitleError={formTitleError} 
            formMsgError={formMsgError} 
            emptySpaceError={emptySpaceError}
            msgSent={msgSent}
            handleSubmit={handleSubmit}
            handleTitleChange={handleTitleChange}
            handleMsgChange={handleMsgChange}
            />
        </>
    );
}

export default UserDetails;