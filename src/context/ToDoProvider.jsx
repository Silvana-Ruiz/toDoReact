import { useState, createContext } from 'react';

const ToDoContext = createContext();

const emptyMetrics = {
    averageTimeTotal: "0:00",
    averageTimeLowTasks: "0:00",
    averageTimeMediumTasks: "0:00",
    averageTimeHighTasks: "0:00"
};

const ToDoProvider = ( {children} ) => {
    const [toDoList, setToDoList] = useState([]);
    const [metrics, setMetrics] = useState(emptyMetrics);
    const [showCreationModal, setShowCreationModal] = useState(false);

    const openCloseCreationModal = (e) => {
        e.preventDefault();
        setShowCreationModal(!showCreationModal);
      }

    return (
        <ToDoContext.Provider
            value={{
                setToDoList,
                toDoList,
                setMetrics,
                metrics,
                setShowCreationModal,
                showCreationModal,
                openCloseCreationModal
            }} // Object
        >
            {children}
        </ToDoContext.Provider>
    )
}

export {
    ToDoProvider
}

export default ToDoContext;