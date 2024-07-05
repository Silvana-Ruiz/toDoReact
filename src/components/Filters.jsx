import { useState } from 'react';
import useToDoContext from '../hooks/useToDoContext';

const emptyFilter = {
    text: '',
    priority: 'All',
    state: 'All'
};

const Filters = () => {
    const { 
        toDoList,
        setToDoList,
        filteredToDoList,
        setFilteredToDoList,
        paginatedToDoList,
        setPaginatedToDoList } = useToDoContext();

  const [ searchFilter, setSearchFilter ] = useState(emptyFilter);

  const updateSearchFilter = (e) => {
    setSearchFilter({
        ...searchFilter,
        [e.target.name]: e.target.value
    });
  }

  const getFilteredToDos =  () => {
    const { text, priority, state } = searchFilter;
    fetch(`http://localhost:9090/todo?text=${text}&state=${state}&priority=${priority}`,  {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }})
    .then(response => response.json())
    .then(data => {
        console.log('filtered', data);
        setFilteredToDoList(data);
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
    })
    .catch(error => console.error('Error:', error));
  }

  return (
    <div className='grid grid-cols-7 gap-4 grid-rows-3'>
        <div className='row-span-1'>
            <label>Name</label>
            <input 
                type='text' 
                name='text' 
                value={searchFilter.text} 
                onChange={updateSearchFilter} 
                className='col-start-2 col-end-7'
            />
        </div>

        <div className='row-span-2'>
            <label>Priority</label>
            <select name='priority' value={searchFilter.priority} onChange={updateSearchFilter} >
                <option value='All' selected>All</option>
                <option value='High'>High</option>
                <option value='Medium'>Medium</option>
                <option value='Low'>Low</option>
            </select>
        </div>
        <div className='row-span-3'>
            <label>State</label>
            <select name='state' value={searchFilter.state} onChange={updateSearchFilter} >
                <option value='All' selected>All</option>
                <option value='Done'>Done</option>
                <option value='Undone'>Undone</option>
            </select>
        </div>
        <button onClick={getFilteredToDos}>Search</button>
 </div>
  )
}

export default Filters