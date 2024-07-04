import React, { useContext } from 'react'
import ToDoContext from '../context/ToDoProvider';

const useToDoContext = () => {
  return useContext(ToDoContext);
}

export default useToDoContext;