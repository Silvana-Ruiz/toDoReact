import { useState, useEffect } from 'react';
import { formatDate } from './../utilities/utility';

const ToDoTable = () => {
  const [toDoList, setToDoList] = useState([]);
  const [metrics, setMetrics] = useState({});


  useEffect(() => {
    fetch("http://localhost:9090/todo",  {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }})
    .then(response => response.json())
    .then(data => {
        setToDoList(data);
        console.log(toDoList);
    })
    .catch(error => console.error('Error:', error));
    
  }, []);

  useEffect(() => {
    console.log(toDoList);
  }, [toDoList]);

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

  const deleteTask = (id) => {
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

  return (
    <>
        <h1>ToDoTable</h1>
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
            {toDoList.map(toDoRecord => (
                <div className='grid grid-cols-5' key={toDoRecord.id}>
                    <input type='checkbox' onClick={(e) => checkTaskAsDone(e, toDoRecord.id)}/>
                    <div>{toDoRecord.text}</div>
                    <div>{toDoRecord.priority}</div>
                    <div>{formatDate(toDoRecord.dueDate)}</div>
                    <div>
                        <button>Edit</button>
                        {" "}/{" "} 
                        <button onClick={() => deleteTask(toDoRecord.id)}> Delete</button>
                    </div>
                </div>
            ))}
        </div>


    </>
  )
}

export default ToDoTable;