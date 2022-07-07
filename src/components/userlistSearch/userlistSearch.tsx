import React, {useState} from 'react';
import { Button } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { User } from '../userlist/userlist';
import "./userlistSearch.css";

function UserlistSearch({users}: {users: User[]}) {

    const [userlist, setUserlist] = useState<{
        first_name: string;
        last_name: string;
        email: string
    }[] | undefined>(users);

    const [searchValue, setSearchValue] = useState<string>('');

    const handleOnClick = () => {
        const findUsers = 
        userlist && userlist?.length > 0 
            ? userlist?.filter((user) => user?.first_name.toLowerCase().includes(searchValue.toLowerCase()) || user?.last_name.toLowerCase().includes(searchValue.toLowerCase()) || user?.email.toLowerCase().includes(searchValue.toLowerCase()))
            : undefined
        setUserlist(findUsers);
    }

    const userSearchTitle: string = "Find a user";
    const userSearchInputPlaceholder: string = "Type to search";
    const buttonText: string = "Search";
    const noUserMsg: string = "No user found";

    return (
        <div className='userlistSearch_box'>
            <div className='userlistSearch_box--title'>
                <h2 className='userlistSearch_box--title--text'>{userSearchTitle}</h2>
            </div>
            <div className='userlistSearch_box--inputwrapper'>
                <input 
                type="text" 
                placeholder={userSearchInputPlaceholder} 
                value={searchValue}
                onChange={e => {
                    setSearchValue(e.target.value);
                    setUserlist(users);
                }}
                />
                <Button 
                variant="text"
                size="small"
                endIcon={<SearchRoundedIcon/>}
                disabled={!searchValue}
                onClick={handleOnClick}>
                    {buttonText}
                </Button>
            </div>
            <div className="userlistSearch_box--userlist">
                {userlist && userlist?.length === 0 && (
                    <div className='userlistSearch_box--userlist--notfound'>{noUserMsg}</div>
                )}    

                {userlist &&
                 userlist?.length> 0 && 
                 userlist?.map((user, id) => {
                    return (
                        <div key={id} className="userlistSearch_box--userlist--user">
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