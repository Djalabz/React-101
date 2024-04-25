import { useEffect, useState } from 'react'

function TodoItem(props) { 
    const [update, setUpdate] = useState('')
    
    const { handleUpdate, handleDelete, setEditMode } = props

    return (
        <div className='flex justify-between border-2 border-slate-300 p-2 rounded' key={index}>
            {!editMode ? 
            <p>{item.data}</p> : 
            <div>
                <input 
                    placeholder={item.data} 
                    value={update} 
                    onChange={(e) => setUpdate(e.target.value)}>
                </input>
                <a onClick={() => handleUpdate(index, item)}>ok</a>
            </div>}

            <div className="icons flex">
                <a onClick={() => handleDelete(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </a>

                <a onClick={() => setEditMode(!editMode)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                </a>
            </div>
        </div>
    )
}

export default TodoItem 