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
    editId,
    setEditId,
    paginatedToDoList,
    setFilteredToDoList,
    setPaginatedToDoList,
    calculatePages, 
    onClickChangePage, 
    currPage,
    } = useToDoContext();

    useEffect(() => {
        getAllToDos();  
        getFilteredToDos();    
    }, []);

      useEffect(() => {
        
        calculatePages();
        onClickChangePage(currPage);
        
    }, [toDoList]);

    const paginateFilteredToDos = () => {
        fetch("http://localhost:9090/todo/pagination?page=1&size=3",  {
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
            // setFilteredToDoList(data);
            // paginateFilteredToDos();

           
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
            console.log('filtered', data);
            setToDoList(data);
           
        })
        .catch(error => console.error('Error:', error));

      }

    const checkTaskAsDone = (e, id) => {
        let url = `http://localhost:9090/todo/${id}/undone`;
        if (e.target.checked) { // The onClick event makes the checkbox checked
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
            console.log(data);
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
            // calculatePages();
            // onClickChangePage(1);
        })
        .catch(error => console.error('Error:', error));
    }
    const updateToDo = (e, id) => {
        e.preventDefault();
        setShowEditModal(!showEditModal);
        setEditId(id);
        console.log('desde editToDo', editId)
    }

    return (
        <>
            {showEditModal && <EditToDoModal/>}
            <div className='grid grid-cols-5'>
                <div>Checkbox</div>
                <div>Name</div>
                <div>
                    <p>Priority</p>
                    <button>sort</button>
                </div>
                <div>
                    <p>Due Date</p>
                    <button>sort</button>
                </div>
                <div>Actions</div>
            </div>
            <div >
                {(paginatedToDoList.length) && paginatedToDoList.map(toDoRecord => (
                    <div className='grid grid-cols-5' key={toDoRecord.id}>
                        <input type='checkbox' onClick={(e) => checkTaskAsDone(e, toDoRecord.id)}/>
                        <div>{toDoRecord.text}</div>
                        <div>{toDoRecord.priority}</div>
                        <div>{toDoRecord.dueDate}</div>
                        <div>
                            <button onClick={(e) => updateToDo(e, toDoRecord.id)}>Edit</button>
                            {" "}/{" "} 
                            <button onClick={(e) => deleteToDo(e, toDoRecord.id)}> Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination />
        </>
    )
}

export default ToDoTable;