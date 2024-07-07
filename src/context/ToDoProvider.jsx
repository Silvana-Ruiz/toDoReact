import { useState, createContext } from 'react';

const ToDoContext = createContext();

const emptyMetrics = {
    averageTimeTotal: "0:00",
    averageTimeLowTasks: "0:00",
    averageTimeMediumTasks: "0:00",
    averageTimeHighTasks: "0:00"
};
const emptyFilter = {
    text: '',
    priority: 'All',
    state: 'All'
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
    const [ stateNumPages, setStateNumPages] = useState(0);
    const [ searchFilter, setSearchFilter ] = useState(emptyFilter);


    const openCloseCreationModal = (e) => {
        e.preventDefault();
        setShowCreationModal(!showCreationModal);
    }

    const calculatePages = () => {

        const numItemsPage = 3;
        console.log('toDoList from Pagination', toDoList)
        let numPages = Math.floor(toDoList.length / numItemsPage);
        if(numPages % numItemsPage != 0 || toDoList.length / numItemsPage > 0) {
            numPages += 1;
        }
        setStateNumPages(numPages)
        console.log("numPages", numPages);
        console.log("stateNumPages", stateNumPages);
        // Store in array numbers for pagination menu
   
        // for (let i = 1; i <= numPages; i++) {
        //     setPageNumbers([...pageNumbers, i]);
        // }

        // setPageNumbers([...Array(numPages).keys()])
        
        // console.log('pageNumbers', pageNumbers);
        
  
    }

   
    const onClickChangePage = (page) => {
        if(!toDoList.length) {
            return;
        }
        setCurrPage(page);
        const { text, priority, state } = searchFilter;
        fetch(`http://localhost:9090/todo?text=${text}&state=${state}&priority=${priority}`,  {
            method: 'GET',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }})
        .then(response => response.json())
        .then(data => {
            console.log('filtered', data);
            setFilteredToDoList([...data]);
            fetch(`http://localhost:9090/todo/pagination?page=${page}&size=3`,  {
                method: 'GET',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                }})
                .then(response => response.json())
                .then(data1 => {
                    setPaginatedToDoList([...data1]);
                    console.log('paginated to dos', data1);
                })
                .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));

        
        // fetch(`http://localhost:9090/todo/pagination?page=${page}&size=3`,  {
        //     method: 'GET',
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json',
        //     }})
        //     .then(response => response.json())
        //     .then(data => {
        //         setPaginatedToDoList(data);
        //         console.log('paginated to dos', data);
        //     })
        //     .catch(error => console.error('Error:', error));
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
                pageNumbers,
                setPageNumbers,
                stateNumPages,
                searchFilter,
                 setSearchFilter
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