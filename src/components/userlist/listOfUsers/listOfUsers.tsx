import React from "react";
import { User } from "../userlist";
import { Link } from 'react-router-dom';
import "../userlist.css";

function ListOfUsers({users}: {users: User[]}) {
    return (
        <>
             {users.length 
                ? users.map(user => {
                    return (
                        <div className='userlist_box--users--user' key={user.id}>
                            <img key={user.avatar} src={user.avatar}/>
                            <div className='userlist_box--users--user--text'>
                                <p>{user.first_name} {user.last_name}</p>
                                <p>{user.email}</p>
                            </div>
                            <Link to={`/user/${user.id}`}>Go to user page</Link>
                        </div>
                    )
                })
                : <p style={{
                     fontSize: "2rem",
                     color: "red"}}>
                        Users not found
                  </p>}
        </>
    )
}

export default ListOfUsers;
