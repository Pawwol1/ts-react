import React, {useState} from 'react';
import "./userlistSearch.css";


function UserlistSearch() {

    const users = [
        {
            "id": 7,
            "email": "michael.lawson@reqres.in",
            "first_name": "Michael",
            "last_name": "Lawson",
            "avatar": "https://reqres.in/img/faces/7-image.jpg"
        },
        {
            "id": 8,
            "email": "lindsay.ferguson@reqres.in",
            "first_name": "Lindsay",
            "last_name": "Ferguson",
            "avatar": "https://reqres.in/img/faces/8-image.jpg"
        },
        {
            "id": 9,
            "email": "tobias.funke@reqres.in",
            "first_name": "Tobias",
            "last_name": "Funke",
            "avatar": "https://reqres.in/img/faces/9-image.jpg"
        }
    ]

    const [userlist, setUserlist] = useState<{
        first_name: string;
        last_name: string;
        email: string
    }[] | undefined>(users);
    const [searchValue, setSearchValue] = useState<string>('');

    const handleOnClick = () => {
        const findUsers = 
        userlist && userlist?.length > 0 
            ? userlist?.filter((user) => user?.first_name.includes(searchValue.toLowerCase()) || user?.last_name.includes(searchValue.toLowerCase()) || user?.email.includes(searchValue.toLowerCase()))
            : undefined
        setUserlist(findUsers);
    }

    return (
        <div className='userlistSearch_box'>
            <div className='userlistSearch_box--title'>
                <h1 className='userlistSearch_box--title--text'>Find a user</h1>
            </div>
            <div className='userlistSearch_box--inputwrapper'>
                <input 
                type="text" 
                placeholder='Search user' 
                value={searchValue}
                onChange={e => {
                    setSearchValue(e.target.value);
                    setUserlist(users);
                }}
                />
                <button 
                disabled={!searchValue} 
                onClick={handleOnClick}>Search</button>
            </div>
            <div className="userlistSearch_box--userlist">
                {userlist && userlist?.length === 0 && (
                    <div className='userlistSearch_box--userlist--notfound'>No user found</div>
                )}    

                {userlist &&
                 userlist?.length> 0 && 
                 userlist?.map(user => {
                    return (
                        <div className="userlistSearch_box--userlist--user">
                             <h3>{user?.first_name}</h3>
                              <p>{user?.last_name}</p>
                              <p>{user?.email}</p>  
                        </div>
                    )
                })}
            </div>  
        </div>
    );
}

export default UserlistSearch;