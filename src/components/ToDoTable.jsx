import { useState, useEffect } from 'react';
import { formatDate } from './../utilities/utility';
import useToDoContext from '../hooks/useToDoContext';
import EditToDoModal from './EditToDoModal';
import Pagination from './Pagination';

const ToDoTable = () => {
  
    const { 
    toDoList,
    setToDoList,
    setMetrics,
    showEditModal,
    setShowEditModal,
    setEditId,
    paginatedToDoList,
    setPaginatedToDoList,
    calculatePages, 
    onClickChangePage, 
    currPage,
    setFilteredToDoList,
    sortingOptions,
    setSortingOptions
    } = useToDoContext();

    const createCheckboxDictFalse = (done) => {
        const dict = {};
        toDoList.forEach(toDo => {
            dict[toDo.id] = done;
        });
        return dict;
    }

    

    const [ allChecked, setAllChecked ] = useState(false);

    const [ checkboxes, setCheckboxes ] = useState(() => createCheckboxDictFalse(false));

    

    useEffect(() => {
        getAllToDos();  
        getFilteredToDos();   // Initialize filtered to do list
    }, []);

      useEffect(() => {
        calculatePages();
        onClickChangePage();
    }, [toDoList]);

    useEffect(() => {
        onClickChangePage();
    }, [currPage]);

    useEffect(() => {
        sortToDos();
    }, [sortingOptions]);

 
    const paginateFilteredToDos = () => {
        fetch("http://localhost:9090/todo/pagination?page=1&size=10",  {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }})
            .then(response => response.json())
            .then(data1 => {
                setPaginatedToDoList(data1);
                console.log('paginated filtered to dos', data1);
                
                
            })
            .catch(error => console.error('Error:', error));
            
    }

    const getFilteredToDos = () => {
        fetch('http://localhost:9090/todo?text=&state=All&priority=All',  {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }})
        .then(response => response.json())
        .then(data => {
            console.log('filtered', data);
        })
        .catch(error => console.error('Error:', error));

      }

    const getAllToDos = () => {
        fetch('http://localhost:9090/todo?text=&state=All&priority=All',  {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }})
        .then(response => response.json())
        .then(data => {
            setToDoList(data);
           
        })
        .catch(error => console.error('Error:', error));

    }

    const checkTaskAsDone = (id) => {
        let url = `http://localhost:9090/todo/${id}/undone`;
        
        if (!checkboxes[id]) { // The onClick event makes the checkbox checked
            url = `http://localhost:9090/todo/${id}/done`;
        }
        
        fetch(url,  {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }})
        .then(response => response.json())
        .then(data => {
            setMetrics(data);
            setCheckboxes({...checkboxes, [id]: !checkboxes[id] });
        })
        .catch(error => console.error('Error:', error));
    }

    const deleteToDo = (e, id) => {
        e.preventDefault();
        let url = `http://localhost:9090/todo/${id}`;
        fetch(url,  {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }})
        .then(response => response.json())
        .then(data => {
            setToDoList(data);
        })
        .catch(error => console.error('Error:', error));
    }
    const updateToDo = (e, id) => {
        e.preventDefault();
        setShowEditModal(!showEditModal);
        setEditId(id);
    }

    const onClickMainCheckbox = (e) => {
        setAllChecked(!allChecked);
        let url = 'http://localhost:9090/todo/allundone'
        if(e.target.checked) {
            url = 'http://localhost:9090/todo/alldone'
            setCheckboxes(() => createCheckboxDictFalse(true));
        } else {
            setCheckboxes(() => createCheckboxDictFalse(false));
        }
        fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }})
            .then(response => response.json())
            .then(data => {
                setMetrics(data);
            })
            .catch(error => console.error('Error:', error));
    }

    const sortToDos = () => {
        const { priority, dueDate } = sortingOptions;
        fetch(`http://localhost:9090/todo/sort?priorityorder=${priority}&duedateorder=${dueDate}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }})
            .then(response => response.json())
            .then(data => {
                setToDoList(data);
                console.log("sorted todo", data);
            })

            .catch(error => console.error('Error:', error));
      };

    const onClickSorting = (e, val) => {
    setSortingOptions({
        ...sortingOptions,
        [e.target.name]: val
    });
    };

  
    const getToDoBackgroundColor = (dueDate) => {
        // if there is no dueDate
        if (!dueDate) {
            return '';
        }
        const currentDate = new Date();
        const period = new Date(dueDate).getTime() - currentDate.getTime();
        const days = Math.ceil(period / (1000 * 3600 * 24)); 

        if (days < 0 && days != -1) {
            return 'bg-red-400';
        } else if (days <= 7) {
            return 'bg-red-300';
        } else if (days <= 14) {
            return 'bg-yellow-300';
        } else {
            return 'bg-green-300';
        }
    };


    return (
        <div className='my-10 border bg-white rounded-2xl px-12 py-10 shadow-md'>
            {showEditModal && <EditToDoModal/>}
            <div className='grid grid-cols-5 border-b-2 py-2  bg-custompurple rounded-t-md'>
                <input 
                    type='checkbox' 
                    className='accent-customviolet w-5 justify-self-center' 
                    onClick={onClickMainCheckbox}
                />
                <div>Name</div>
                <div className='flex'>
                    <p>Priority</p>
                    <button name='priority' onClick={(e) => onClickSorting(e, 'ASC')}>{'<'}</button>
                    <button name='priority' onClick={(e) => onClickSorting(e, 'DSC')}>{'>'}</button>
                </div>
                <div className='flex'>
                    <p>Due Date</p>
                    <button name='dueDate' onClick={(e) => onClickSorting(e, 'ASC')}>{'<'}</button>
                    <button name='dueDate' onClick={(e) => onClickSorting(e, 'DSC')}>{'>'}</button>
                </div>
                <div>Actions</div>
            </div>
            <div >
                {(paginatedToDoList.length != 0) ? ( paginatedToDoList.map((toDoRecord) => (
                    <div className='grid grid-cols-5 py-2 border-b-2' key={toDoRecord.id}>
                        <input 
                            type='checkbox' 
                            onClick={() => checkTaskAsDone(toDoRecord.id)}
                            checked={checkboxes[toDoRecord.id]}
                            className='accent-customviolet w-5 justify-self-center'
                        />
                        <div className={`${checkboxes[toDoRecord.id] ? 'line-through' : ''}`}>{toDoRecord.text}</div>
                        <div>{toDoRecord.priority}</div>
                      
                        <div className='flex'>
                            <div className={`p-1 rounded-md ${!checkboxes[toDoRecord.id] ? getToDoBackgroundColor(toDoRecord.dueDate) : ''}`}>{toDoRecord.dueDate}</div>
                        </div>
                        <div className='flex gap-2'>
                            <button 
                                onClick={(e) => updateToDo(e, toDoRecord.id)}
                                className='rounded-md p-1 w-16 text-white  bg-customviolet  active:bg-activebutton font-medium'
                            >
                                Edit
                            </button>
                        
                            <button 
                                onClick={(e) => deleteToDo(e, toDoRecord.id)}
                                className='bg-red-500 text-white rounded-md p-1 px-5 text-center  w-auto active:bg-red-600 font-medium shadow-md'
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))) : (
                    <p className='text-center mt-6 text-neutral-300 text-bold text-2xl'>Yay! No to do's</p>
                )}
            </div>
            <Pagination />
        </div>
    )
}


export default ToDoTable;