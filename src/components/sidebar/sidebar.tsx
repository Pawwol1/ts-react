import React, {useEffect, useState} from 'react';
import './sidebar.css';

function Sidebar() {

    const [shiba, setShiba] = useState<string>("");
    const [refresh, setRefresh] = useState<number>(1);

    useEffect(() => {
        const getShibaImage = async () => {
            const resp = await fetch(`https://shibe.online/api/shibes`);
            if (!resp.ok) {
                const err = "Shiba not Found";
                throw new Error(err);
            }
            const data = await resp.json();
            setShiba(data);
        }
        getShibaImage();
    }, [refresh]);

    const handleClick = () => {
        setRefresh(Math.random());
    }

    const sidebarTitle: string = "Give a smile to shiba!";
    const sidebarText: string = "We prepared cute shiba images to make your day better!";
    const btnText: string = "Get new shiba image";

    return (
        <div className='sidebar_box'>
            <h2 className='sidebar_box--title'>{sidebarTitle}</h2>
            <p className='sidebar_box--text'>{sidebarText}</p>
            <img className='sidebar_box--img' src={shiba} alt="shiba image" />
            <button className='sidebar_box--button' onClick={handleClick}>{btnText}</button>
        </div>
    );
}

export default Sidebar;