import React, { useEffect, useState, MouseEvent } from 'react';
import { Pagination } from '@mui/material';
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
const [page, setPage] = useState<number>(1);
const [totalPages, setTotalPages] = useState<number>(1);

const getUsers = async () => {
    const res = await fetch(`https://reqres.in/api/users?page=${page}`);
    if (!res.ok) {
        const err = "User not Found";
        throw new Error(err);
    }
    const data = await res.json();
    setUsers(data.data);
    // setTotalPages(Array(data.total_pages).fill(1));
    setTotalPages(data.total_pages);
};

useEffect(() => {
    getUsers();
}, [page])

// const handlePageChange = (e: MouseEvent ) => {
//     e.preventDefault();
//     setPage(parseInt(e.currentTarget.id));
// }

    return (
        <div className='userlist_box'>
            <h2 className='userlist_box--title'>User list</h2>
            <div className='userlist_box--users'>

                {users.length 
                ? users.map(user => {
                    return (
                        <div className='userlist_box--users--user' key={user.id}>
                            <img key={user.avatar} src={user.avatar}/>
                            <div className='userlist_box--users--user--text'>
                                <p>{user.first_name} {user.last_name}</p>
                                <p>{user.email}</p>
                            </div>
                        </div>
                    )
                })
                : <p style={{
                     fontSize: "2rem",
                     color: "red"}}>
                        Users not found
                  </p>}

            </div>
            <div className="userlist_box--page_box">
                    <p>Strona:</p>
                    {/* {totalPages.map((page, id) => {
                        return ( 
                        <a key={id} 
                                href="" 
                                id={(id + page).toString()}
                                className="userlist_box--page_box--singlepage"
                                onClick={(e) => handlePageChange(e)}
                        >
                                {id + page}
                        </a> )
                    })} */}
                    <Pagination count={totalPages} onChange={(e, page) => setPage(page)}></Pagination>
            </div>
        </div>
    );
}

export default Userlist;