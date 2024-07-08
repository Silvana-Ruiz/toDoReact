import { useEffect } from 'react';
import useToDoContext from '../hooks/useToDoContext';

const Pagination = () => {
    const { currPage, setCurrPage, pageNumbers, setPageNumbers, stateNumPages} = useToDoContext();

 
    useEffect(() => {
        const arr = [];
        for (let i = 1; i <= stateNumPages; i++) {
            arr.push(i);
        }
        setPageNumbers([...arr]);
    }, [stateNumPages]);

    return (
        <>
        <div className='flex justify-center py-2 gap-4'>
            {pageNumbers.length != 0 && pageNumbers.map((pageNum) => (
                <button key={pageNum} className={`px-1 ${pageNum == currPage && 'bg-customviolet rounded-sm text-white'}`} onClick={() => setCurrPage(pageNum)}>{pageNum }</button>
            ))}
        </div>
        </>
    )
}

export default Pagination