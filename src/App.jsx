import { useState } from 'react';
import './App.css';
import ToDoTable from './components/ToDoTable';
import { ToDoProvider } from './context/ToDoProvider';
import Filters from './components/Filters';
import Metrics from './components/Metrics';
import NewToDo from './components/NewToDo';
import CreateTodoModal from './components/CreateTodoModal';

function App() {
  return (
      <ToDoProvider>
        <div className='m-12'>
          <Filters />
          <NewToDo />
          <ToDoTable />
          <Metrics />
        </div>
    </ToDoProvider>
  )
}

export default App;
