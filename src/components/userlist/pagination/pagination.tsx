import React from 'react';
import Pagination from '@mui/material/Pagination';
import "../userlist.css";

interface IProps {
    totalPages: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
}


function PaginationComponent({totalPages, setPage}: IProps) {
    const pageStr: string = "Page:"
    return (
        <div>
            {totalPages > 1
            ? <div className="userlist_box--page_box">
                    <p>{pageStr}</p>
                    <Pagination 
                    data-testid="pagination"
                    count={totalPages} 
                    onChange={(e, page) => setPage(page)}
                    />
             </div>
            : <p data-testid="hidden" aria-hidden="true"/>
            }
        </div>
    );
}

export default PaginationComponent;