import React from 'react'
import useToDoContext from '../hooks/useToDoContext'

const Metrics = () => {
const { metrics } = useToDoContext();
const { averageTimeTotal, averageTimeLowTasks, averageTimeMediumTasks, averageTimeHighTasks } = metrics;
  return (
    <div className='grid grid-cols-2 my-9'>
        <div className='justify-self-center'>
            <p>Average time to finish tasks:</p>
            <p>{averageTimeTotal}</p>
        </div>
        <div className='justify-self-center'>
            <p>Average time to finish tasks by priority:</p>
            <p>Low: {averageTimeLowTasks}</p>
            <p>Medium: {averageTimeMediumTasks}</p>
            <p>High: {averageTimeHighTasks}</p>
        </div>
    </div>
  )
}

export default Metrics