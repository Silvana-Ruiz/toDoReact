import React from 'react'
import useToDoContext from '../hooks/useToDoContext'

const Metrics = () => {
const { metrics } = useToDoContext();
const { averageTimeTotal, averageTimeLowTasks, averageTimeMediumTasks, averageTimeHighTasks } = metrics;
  return (
    <div className='grid grid-cols-2 my-10 border bg-white rounded-2xl shadow-inner px-12 py-10 '>
        <div className='justify-self-center'>
            <p className='mb-2'>Average time to finish tasks</p>
            <p className='text-xl font-bold italic text-neutral-600 text-center'>{averageTimeTotal}</p>
        </div>
        <div className='justify-self-center'>
            <p className='text-center mb-2'>Average time to finish tasks by priority</p>
            <div className='flex flex-row gap-4 text-center justify-center'>
              <div>
                <p className='text-xl font-bold italic text-neutral-600'>{averageTimeLowTasks}</p>
                <p className='font-medium'>Low</p>
              </div>

              <div>
                <p className='text-xl font-bold italic text-neutral-600'>{averageTimeMediumTasks}</p>
                <p className='font-medium'>Medium</p>
              </div>

              <div>
                <p className='text-xl font-bold italic text-neutral-600'>{averageTimeHighTasks}</p>
                <p className='font-medium'>High</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Metrics