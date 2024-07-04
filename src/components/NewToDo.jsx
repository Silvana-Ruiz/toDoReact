import React from 'react'
import CreateTodoModal from './CreateTodoModal';
import useToDoContext from '../hooks/useToDoContext';

const NewToDo = () => {
  const {showCreationModal, openCloseCreationModal} = useToDoContext();
  return (
    <>
        <button onClick={openCloseCreationModal}>+ New To Do</button>
        {showCreationModal && <CreateTodoModal />}
    </>
  )
}

export default NewToDo;