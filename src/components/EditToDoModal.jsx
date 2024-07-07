import { useState, useEffect } from 'react';
import useToDoContext from '../hooks/useToDoContext';

const EditToDoModal = () => {
    const { toDoList, setToDoList, setShowEditModal, showEditModal, editId} = useToDoContext();
    console.log('desde edito modal', editId)

    

    useEffect(() => {
        console.log(editId);
        retrieveToDo(editId);
    }, []);
  const emptyToDo = {
    text: "",
    priority: "",
    dueDate: ""
  };
  const [ editToDo, setEditToDo ] = useState(emptyToDo);
  const [ error, setError] = useState("");

  const retrieveToDo = async () => {
    try {
        const response = await fetch(`http://localhost:9090/todo/${editId}`,  {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        setEditToDo(data);
    } catch (error) {
        console.error('Error:', error);
    }
  }

  const updateToDo = async (e) => {
    e.preventDefault();
    if (editToDo.text == "" && editToDo.priority == "") {
        setError("Please add the name and priority");
        return;
    } else if (editToDo.text == "") {
        setError("Please add the name");
        return;
    } else if (editToDo.priority == "") {
        setError("Please add the priority");
        return;
    }
    try {
        const response = await fetch(`http://localhost:9090/todo/${editId}`,  {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editToDo),
        });

        
        const data = await response.json();
        setToDoList(data);
    } catch (error) {
        console.error('Error:', error);
    }
    setShowEditModal(false);
  }

  const onClickUpdateToDo = (e) => {
    setEditToDo({
        ...editToDo,
        [e.target.name]: e.target.value
    });
  }


  return (
    <div>
        <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden absolute flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
            
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            
                    <div className="flex items-center justify-between p-5 pb-0  rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Update the To Do
                        </h3>
                        <button
                            type="button" 
                            onClick={() => setShowEditModal(!showEditModal)}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal"
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                
                    <form className="p-4 md:p-5">
                        {(error != '') && (
                            <p className="bg-red-400 rounded-md text-white p-2 mb-2" >{error}</p>
                        )}
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input 
                                    type="text"
                                    name="text" 
                                    value={editToDo.text}
                                    onChange={onClickUpdateToDo}
                                    id="name" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" 
                                />
                            </div>
                           
                        <div className="relative max-w-sm col-span-2 sm:col-span-1">
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
                            <input 
                                id="default-datepicker" 
                                type="date" 
                                name="dueDate" 
                                value={editToDo.dueDate}
                                onChange={onClickUpdateToDo}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" 
                            />
                        </div>

                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Priority</label>
                                <select 
                                    id="category" 
                                    name="priority" 
                                    value={editToDo.priority}
                                    onChange={onClickUpdateToDo}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value="">Select priority</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                        </div>
                        <div
                             className="text-white flex justify-end hover:bg-customlightpurple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <button 
                                type='button'
                                onClick={updateToDo}
                                className='bg-customviolet px-5 py-2.5 rounded-md font-medium shadow-md active:bg-activebutton'
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div> 

    </div>
  )
}

export default EditToDoModal