import { useState } from 'react'
import './App.css'
import ToDoTable from './components/ToDoTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ToDoTable />
    </>
  )
}

export default App
