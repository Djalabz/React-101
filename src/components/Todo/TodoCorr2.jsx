import { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import TextField from '@mui/material/TextField'
import { v4 as uuidv4 } from 'uuid'
import './Todo.css'

function Todo() {
    // Ici les variables de State
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])


    // Ici les comportements de nos todos
    function handleChange(e) {
        setTodo(e.target.value)
    }

    function handleAddTodo() {
        if (todo != '') {
            const newItem = {
                id: uuidv4(),
                task: todo,
                likes: 0
            }
            setTodos(todos => [...todos, newItem])
        }
    }

    function handleDelete(id) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id != id))
    }

    function handleLike(id) {
        setTodos(prevTodos => prevTodos.map(todo => 
            todo.id === id ? { ...todo, likes: todo.likes + 1} : todo
        ))
    }

    return ( 
        <div className="todo-app">
            <h1>Ma Todo List</h1>
            <div className="todo-input">
                <TextField 
                    placeholder='Ajouter une tache...'
                    type='text'
                    id="outlined-basic" 
                    label="Task" 
                    variant="outlined" 
                    sx={{ width: '20rem'}}
                    value={todo}
                    onChange={(e) => handleChange(e)}
                />
                <AddCircleIcon
                    sx={{ cursor:'pointer', fontSize:'2.5rem', marginLeft: '1rem'}}
                    onClick={() => handleAddTodo()}
                />
            </div>
            <div className="todos">
                {todos.map((todo) => (
                    <div className='todo-item' key={todo.id}>
                        <p>{todo.task}</p>
                        <button className='delete' onClick={() => handleDelete(todo.id)}>x</button>
                        <button onClick={() => handleLike(todo.id)}>LIKES : {todo.likes}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Todo;