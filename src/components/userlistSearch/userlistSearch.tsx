import React, {useEffect, useState} from 'react';
import { Button } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { User } from '../userlist/userlist';
import ListOfUsers from '../userlist/listOfUsers/listOfUsers';
import "./userlistSearch.css";

function UserlistSearch({users}: {users: User[]}) {

    const [userlist, setUserlist] = useState<User[] | undefined>(users);
    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        setUserlist(users);
    },[users, searchValue])

    const handleOnClick = () => {
        const searchToLowerCase = (value: string) => {
            return value.toLowerCase().includes(searchValue.toLowerCase())
        }

        const findUsers = 
        userlist && userlist?.length > 0 
            ? userlist?.filter((user) => searchToLowerCase(user?.first_name) || searchToLowerCase(user?.last_name) || searchToLowerCase(user?.email))
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
                    }}
                />
                <Button 
                    variant="text"
                    size="small"
                    endIcon={<SearchRoundedIcon/>}
                    disabled={!searchValue}
                    onClick={handleOnClick}
                >
                    {buttonText}
                </Button>
            </div>
            <div className="userlistSearch_box--userlist">
                {userlist && userlist?.length === 0 && (
                    <div className='userlistSearch_box--userlist--notfound'>{noUserMsg}</div>
                )}    

                {userlist &&
                 userlist?.length> 0 && 
                 <ListOfUsers users={userlist}/>
                }
            </div>  
        </div>
    );
}

export default UserlistSearch;