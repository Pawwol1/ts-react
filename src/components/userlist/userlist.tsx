import React, { useEffect, useState } from 'react';
import UserlistSearch from '../userlistSearch/userlistSearch';
import PaginationComponent from './pagination/pagination';
import "./userlist.css";
export interface User {
    id?: number,
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

    return (
        <div className='userlist_box'>
            <UserlistSearch users={users}/>
            <PaginationComponent totalPages={totalPages} setPage={setPage}/>
        </div>
    );
}



export default Userlist;