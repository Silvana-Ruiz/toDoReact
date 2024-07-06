import { useState, useEffect } from 'react';
import useToDoContext from '../hooks/useToDoContext';

const Pagination = () => {
    const { toDoList, paginatedToDoList, setPaginatedToDoList, filteredToDoList, calculatePages, onClickChangePage, currPage, pageNumbers} = useToDoContext();
    // const [ pageNumbers, setPageNumbers ] = useState([]);
    // const [ currPage, setCurrPage ] = useState(-1);


    // useEffect(() => {
        
    //     calculatePages();
    //     onClickChangePage(currPage);
        
    // }, [toDoList]);

    // useEffect(() => {
    //     console.log('from cpagination')
    //     calculatePages();
    //     onClickChangePage(1);
        
    // }, []);

    
    // const calculatePages = () => {
        
    //     const numItemsPage = 3;
    //     let numPages = Math.floor(toDoList.length / numItemsPage);
    //     if(numPages % numItemsPage != 0) {
    //         numPages += 1;
    //     }
    //     console.log("numPages", numPages);
    //     // Store in array numbers for pagination menu
    //     const pages = [];
    //     for (let i = 1; i <= numPages; i++) {
    //         pages.push(i);
    //     }
    //     setPageNumbers(pages);
        
  
    // }

    
    
    // const onClickChangePage = (page) => {
    //     setCurrPage(page);
    //     fetch(`http://localhost:9090/todo/pagination?page=${page}&size=3`,  {
    //         method: 'GET',
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json',
    //         }})
    //         .then(response => response.json())
    //         .then(data => {
    //             setPaginatedToDoList(data);
    //             console.log('paginated filtered to dos', data);
    //         })
    //         .catch(error => console.error('Error:', error));
    // }


    return (
        <>
        <div className='flex'>
            {/* <button onClick={() => onClickChangePage(1)}>{1}</button>
            <button onClick={() => onClickChangePage(2)}>{2}</button>
            <button onClick={() => onClickChangePage(3)}>{3}</button> */}
            {pageNumbers.length != 0 && pageNumbers.map((pageNum) => (
                <button key={pageNum} onClick={() => onClickChangePage(pageNum)}>{pageNum}</button>
            ))}
        </div>
        </>
    )
}

export default Pagination