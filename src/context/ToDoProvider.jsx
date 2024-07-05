import { useState, createContext } from 'react';

const ToDoContext = createContext();

const emptyMetrics = {
    averageTimeTotal: "0:00",
    averageTimeLowTasks: "0:00",
    averageTimeMediumTasks: "0:00",
    averageTimeHighTasks: "0:00"
};

const ToDoProvider = ( {children} ) => {
    const [toDoList, setToDoList] = useState([]);
    const [filteredToDoList, setFilteredToDoList] = useState([]);
    const [paginatedToDoList, setPaginatedToDoList] = useState([]);
    const [metrics, setMetrics] = useState(emptyMetrics);
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [ pageNumbers, setPageNumbers ] = useState([]);
    const [ currPage, setCurrPage ] = useState(-1);


    const openCloseCreationModal = (e) => {
        e.preventDefault();
        setShowCreationModal(!showCreationModal);
    }

    const calculatePages = () => {
        
        const numItemsPage = 3;
        let numPages = Math.floor(toDoList.length / numItemsPage);
        if(numPages % numItemsPage != 0) {
            numPages += 1;
        }
        console.log("numPages", numPages);
        // Store in array numbers for pagination menu
        const pages = [];
        for (let i = 1; i <= numPages; i++) {
            pages.push(i);
        }
        setPageNumbers(pages);
        
  
    }

    
    
    const onClickChangePage = (page) => {
        setCurrPage(page);
        fetch(`http://localhost:9090/todo/pagination?page=${page}&size=3`,  {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }})
            .then(response => response.json())
            .then(data => {
                setPaginatedToDoList(data);
                console.log('paginated filtered to dos', data);
            })
            .catch(error => console.error('Error:', error));
    }



    return (
        <ToDoContext.Provider
            value={{
                setToDoList,
                toDoList,
                setMetrics,
                metrics,
                setShowCreationModal,
                showCreationModal,
                openCloseCreationModal,
                setShowEditModal,
                showEditModal,
                setEditId,
                editId,
                filteredToDoList,
                setFilteredToDoList,
                paginatedToDoList,
                setPaginatedToDoList,
                calculatePages,
                onClickChangePage,
                currPage,
                pageNumbers
            }} // Object
        >
            {children}
        </ToDoContext.Provider>
    )
}

export {
    ToDoProvider
}

export default ToDoContext;