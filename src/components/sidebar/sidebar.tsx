import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import './sidebar.css';

type Anchor = 'left' | 'right';

function Sidebar() {

    const [shiba, setShiba] = useState<string>("");
    const [refresh, setRefresh] = useState<number>(1);
    const [isOpen, setIsOpen] = useState({
        left: false,
        right: false,
      });

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

    const toggleSidebar = (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsOpen({ ...isOpen, [anchor]: open });
    };

  const contentBox = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      
      onKeyDown={toggleSidebar(anchor, false)}
    >
        <div className='sidebar_box'>
            <div className='sidebar_box--close'>
              <p onClick={toggleSidebar(anchor, false)}>X</p>
            </div>
            <h2 className='sidebar_box--title'>{sidebarTitle}</h2>
            <p className='sidebar_box--text'>{sidebarText}</p>
            <img className='sidebar_box--img' src={shiba} alt="shiba image" />
            <button className='sidebar_box--button' onClick={handleClick}>{btnText}</button>
        </div>
    </Box>
  );

    const sidebarTitle: string = "Give a smile to shiba!";
    const sidebarText: string = "We prepared cute shiba images to make your day better!";
    const btnText: string = "Get new shiba image";
    const boxTitle: string = "Please choose which side you want to see the surprise on:";

    return (
      <>
        <h3 style={{padding: "3rem 0 0 0", textAlign: "center"}}>{boxTitle}</h3>
          <div className="sidebar_open">
            {(['left', 'right'] as const).map((anchor) => (
            <div key={anchor}>
              <Button onClick={toggleSidebar(anchor, true)} >{anchor}</Button>
              <Drawer
                anchor={anchor}
                open={isOpen[anchor]}
                onClose={toggleSidebar(anchor, false)}
              >
                {contentBox(anchor)}
              </Drawer>
            </div>
            ))}
          </div>
      </>
    );
}

export default Sidebar;