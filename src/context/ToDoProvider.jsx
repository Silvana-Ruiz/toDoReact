import { useState, createContext, useEffect } from 'react';

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
const defaultSortingOptions = {
    priority: '',
    dueDate: ''
}

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
    const [sortingOptions, setSortingOptions] = useState(defaultSortingOptions);
    
    const openCloseCreationModal = (e) => {
        e.preventDefault();
        setShowCreationModal(!showCreationModal);
    }

    const calculatePages = () => {
        let pageList = [];
        if(searchFilter.text || searchFilter.priority != 'All' || searchFilter.state != 'All') {
            pageList = filteredToDoList;
        } else {
            pageList = toDoList;
        }
        const numItemsPage = 10;
    
        let numPages = Math.floor(pageList.length / numItemsPage);
        if(pageList.length % numItemsPage != 0 || numPages == 0) {
            numPages += 1;
        }
        setStateNumPages(numPages)

        if(numPages < currPage) {
            console.log('stateNumPages < currPage')
            console.log('stateNumPages', stateNumPages)
            console.log('currPage', currPage)
            setCurrPage(numPages);
        }
  
    }

   
    const onClickChangePage = () => {
        console.log('sortingOptions', sortingOptions);
        console.log('defaultSortingOptions', defaultSortingOptions);
        if(sortingOptions != defaultSortingOptions) {

            fetch(`http://localhost:9090/todo/pagination?page=${currPage}&size=10`,  {
                method: 'GET',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                }})
                .then(response => response.json())
                .then(data1 => {
                    setPaginatedToDoList([...data1]);
                    console.log('paginated onClickChangePage', data1);
                })
                .catch(error => console.error('Error:', error));
                return;
        }
        const { text, priority, state } = searchFilter;
        fetch(`http://localhost:9090/todo?text=${text}&state=${state}&priority=${priority}`,  {
            method: 'GET',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }})
        .then(response => response.json())
        .then(data => {
            console.log('filtered from onClickChangePage', data);
            setFilteredToDoList([...data]);
            fetch(`http://localhost:9090/todo/pagination?page=${currPage}&size=10`,  {
                method: 'GET',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                }})
                .then(response => response.json())
                .then(data1 => {
                    setPaginatedToDoList([...data1]);
                    console.log('paginated onClickChangePage', data1);
                    // if(data1.length() == 0) {
                    //     setCurrPage(currPage > 1? currPage - 1: 0)
                    // }
                })
                .catch(error => console.error('Error:', error));
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
                setCurrPage,
                pageNumbers,
                setPageNumbers,
                stateNumPages,
                searchFilter,
                setSearchFilter,
                emptyFilter,
                sortingOptions, 
                setSortingOptions,
                defaultSortingOptions
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