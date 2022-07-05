import React, { useEffect, useState, MouseEvent } from 'react';
import "./userlist.css";

interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    avatar: string
}

function Userlist() {

const [users, setUsers] = useState<User[]>([]);
const [page, setPage] = useState<Number>(1);

const getUsers = async () => {
    const res = await fetch(`https://reqres.in/api/users?page=${page}`);
    const data = await res.json();
    setUsers(data.data)
};

useEffect(() => {
    getUsers();
}, [page])

const handlePageChange = (e: MouseEvent ) => {
    e.preventDefault();
    setPage(parseInt(e.currentTarget.id));
}

    return (
        <div className='userlist_box'>
            <h2 className='userlist_box--title'>User list</h2>
            <div className='userlist_box--users'>
                {users.map(user => {
                    return (
                        <div className='userlist_box--users--user' key={user.id}>
                            <img key={user.avatar} src={user.avatar}/>
                            <div className='userlist_box--users--user--text'>
                                <p>{user.first_name} {user.last_name}</p>
                                <p>{user.email}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="userlist_box--page_box">
                    <p>Strona:</p>
                    <a href="" id="1" className="userlist_box--page_box--singlepage" onClick={(e) => handlePageChange(e)}>1</a>
                    <a href="" id="2" className="userlist_box--page_box--singlepage" onClick={(e) => handlePageChange(e)}>2</a>
            </div>
        </div>
    );
}

export default Userlist;