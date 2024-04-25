import { useEffect, useState } from 'react'
import axios from 'axios'
import { parse, v4 as uuidv4 } from 'uuid'
import './Todo.css'

function Todo() {
    // Ici les variables de State
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState('')
    const [newTodo, setNewTodo] = useState('') 
    const [deleted, setDeleted] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [update, setUpdate] = useState('')
    const [updatedTodo, setUpdatedTodo] = useState('')

    // Ici les comportements de nos todos
    function handleChange(e) {
        setTodo(e.target.value)
    }

    useEffect(() => {
        axios.get('http://localhost:8000/todos')
            .then(res => setTodos(res.data))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        axios.post('http://localhost:8000/todos', newTodo)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }, [newTodo])

    useEffect(() => {
        axios.delete(`http://localhost:8000/todos/${deleted._id}`, deleted)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }, [deleted])

    useEffect(() => {
        axios.put(`http://localhost:8000/todos/${updatedTodo._id}`, updatedTodo, { params: {
            id: updatedTodo._id,
          }})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }, [updatedTodo])

    function handleAdd() {
        if (todo !== '') {
            const newTodo = {
                data: todo,
            }
            setTodos(todos => [ ...todos, newTodo])
            setNewTodo(newTodo)
            setTodo('')
        }
    }

    function handleDelete(index) {
        setDeleted(todos[index])

        const newTodos = [... todos]
        newTodos.splice(index, 1)
        setTodos(newTodos)
    }


    function handleUpdate(index, item) {
        setEditMode(!editMode)

        const updatedTodo = {
            _id: item._id,
            data: update,
            check: false,
        }

        setUpdatedTodo(updatedTodo)

        const updatedTodos = todos.map((item, i) => {
            if (i === index) {
              return { ...item, data: update}
            }
            return item
          })
        
        setTodos(updatedTodos)
    }

    console.log(todos)

    return ( 
        <div className="todo-app">
            {/* Ici l'input pour la todo */}
            <div className="todo-input">
                <input
                type="text"
                name="todo"
                id="todo"
                className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Écrire Todo"
                value={todo}
                onChange={(e) => handleChange(e)}
                />
                <a onClick={() => handleAdd()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-4 w-8 h-8">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                    </svg>
                </a>
            </div>

            {/* On vient lister les différentes todo de notre tableau todos */}
            <div className='todos'>
                {todos.map((item, index) => (
                    <div className='flex justify-between border-2 border-slate-300 p-2 rounded' key={index}>
                        {!editMode ? 
                            <p>{item.data}</p> : 
                            <div><input 
                                placeholder={item.data} 
                                value={update} 
                                onChange={(e) => setUpdate(e.target.value)}>
                            </input>
                            <a onClick={() => handleUpdate(index, item)}>ok</a></div>}
                        
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
                ))}
            </div>
        </div>
    )
}

export default Todo