import { useState } from 'react';
import useToDoContext from '../hooks/useToDoContext';



const Filters = () => {
    const { 
        setFilteredToDoList,
        setPaginatedToDoList,
        searchFilter,
        setSearchFilter,
        emptyFilter
    } = useToDoContext();

  const updateSearchFilter = (e) => {
    setSearchFilter({
        ...searchFilter,
        [e.target.name]: e.target.value
    });
  }

//   const clearFilters = () => {
//     setSearchFilter(emptyFilter)
//     .then(() => {
//         getFilteredToDos();
//     })
//   }

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
        setFilteredToDoList([...data]);
        fetch("http://localhost:9090/todo/pagination?page=1&size=3",  {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }})
            .then(response => response.json())
            .then(data1 => {
                setPaginatedToDoList([...data1]);
            })
            .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
  }

  return (
    <div className='grid flex-col grid-cols-8 my-10 border bg-white rounded-2xl shadow-md'>
        
            <label className='text-left ml-12 my-10'>Name</label>
            <input 
                type='text' 
                name='text' 
                placeholder='To do'
                value={searchFilter.text} 
                onChange={updateSearchFilter} 
                className='bg-gray-50 border col-start-2 col-end-9 w-11/12 mt-10 mb-5 py-2 px-1 border-gray-300 rounded-md'
            />
      
            <label className='text-left row-start-2 ml-12 mb-5'>Priority</label>
           
                <select 
                    name='priority' 
                    value={searchFilter.priority} 
                    onChange={updateSearchFilter} 
                    className='bg-gray-50 border row-start-2 col-start-2 col-end-5 mb-5 py-2 border-gray-300 rounded-md'
                >
                    <option value='All' selected>All</option>
                    <option value='High'>High</option>
                    <option value='Medium'>Medium</option>
                    <option value='Low'>Low</option>
                </select>
         

      
            <label className='text-left row-start-3 ml-12 mb-5'>State</label>
            <select 
                name='state' 
                value={searchFilter.state} 
                onChange={updateSearchFilter}
                className='bg-gray-50 border row-start-3 col-start-2 col-end-5 mb-5 py-2 border-gray-300 rounded-md'
            >
                <option value='All' selected>All</option>
                <option value='Done'>Done</option>
                <option value='Undone'>Undone</option>
            </select>
     
        {/* <button 
        className='row-start-3 col-start-6 col-end-7 w-36 ml-20 mb-5 py-1 text-white bg-customviolet rounded-md active:bg-activebutton shadow-md font-medium'
        onClick={clearFilters}
    >
        Clear
        </button> */}
        <button 
            className='row-start-3 col-start-7 col-end-9 w-36 ml-20 mb-5 py-1 text-white bg-customviolet rounded-md active:bg-activebutton shadow-md font-medium'
            onClick={getFilteredToDos}
        >
            Search
        </button>
 </div>
  )
}

export default Filters