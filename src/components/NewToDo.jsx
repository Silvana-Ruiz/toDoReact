import React from 'react'
import CreateTodoModal from './CreateTodoModal';
import useToDoContext from '../hooks/useToDoContext';

const NewToDo = () => {
  const {showCreationModal, openCloseCreationModal} = useToDoContext();
  return (
    <>
        <button 
          onClick={openCloseCreationModal}
          className='w-36 border mb-5 py-2 bg-custompurple rounded-md active:bg-customviolet'
        >
          + New To Do
        </button>
        {showCreationModal && <CreateTodoModal />}
    </>
  )
}

export default NewToDo;