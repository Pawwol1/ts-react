import React, { useEffect, useState, MouseEvent } from 'react';
import { Pagination } from '@mui/material';
import UserlistSearch from '../userlistSearch/userlistSearch';
import "./userlist.css";
export interface User {
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
const URL = `https://reqres.in/api/users?page=${page}`

useEffect(() => {
    const getUsers = async () => {
        const res = await fetch(URL);
        if (!res.ok) {
            const err = "User not Found";
            throw new Error(err);
        }
        const data = await res.json();
        setUsers(data.data);
        setTotalPages(data.total_pages);
    };
    getUsers();
}, [page, URL])

const pageStr: string = "Page:"

    return (
        <div className='userlist_box'>
            <UserlistSearch users={users}/>
            <div className="userlist_box--page_box">
                    <p>{pageStr}</p>
                    <Pagination 
                    data-testid="pagination"
                    count={totalPages} 
                    onChange={(e, page) => setPage(page)}
                    />
            </div>
        </div>
    );
}



export default Userlist;