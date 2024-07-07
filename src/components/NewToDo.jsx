import React from 'react'
import CreateTodoModal from './CreateTodoModal';
import useToDoContext from '../hooks/useToDoContext';

const NewToDo = () => {
  const {showCreationModal, openCloseCreationModal} = useToDoContext();
  return (
    <>
        <button 
          onClick={openCloseCreationModal}
          className='w-36 mb-5 py-2 text-white bg-customviolet rounded-md active:bg-activebutton shadow-md font-medium'
        >
          + New To Do
        </button>
        {showCreationModal && <CreateTodoModal />}
    </>
  )
}

export default NewToDo;