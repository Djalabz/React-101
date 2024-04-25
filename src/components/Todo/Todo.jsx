import { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import TextField from '@mui/material/TextField'
import { v4 as uuidv4 } from 'uuid'
import './Todo.css'

function Todo() {
    // States 
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([]) 

    // Comportements 
    function handleChange(e) {
        setTodo(e.target.value)
    }

    function handleAdd() {
        if (todo != '') {
            const newTodo = {
                id: uuidv4(),
                task: todo,
                likes: 0
            }
            setTodos(todos => [...todos, newTodo])
        }
    }

    function handleDelete(id) {
        setTodos(todos => todos.filter(todo => todo.id !== id))
    }

    function handleLike(id) {
        setTodos(todos => todos.map(todo => 
            todo.id === id ? {...todo, likes: todo.likes + 1} : todo    
        ))
    }

    return ( 
        <div className="todo-app">
            <div className="todo-input">
                <TextField 
                    placeholder='Ajouter une tache...'
                    type='text'
                    id="outlined-basic" 
                    label="Todo" 
                    variant="outlined" 
                    sx={{ width: '20rem'}}
                    value={todo}
                    onChange={(e) => handleChange(e)}
                />
                <AddCircleIcon
                sx={{ cursor:'pointer', fontSize:'2.5rem', marginLeft: '1rem'}}
                onClick={() => handleAdd()}
            />
            </div>
            <div className="todos">
                {todos.map((todo) => (
                    <div key={todo.id} className='todo-item'>
                        {todo.task}
                        <button onClick={() => handleDelete(todo.id)}>x</button>
                        <button onClick={() => handleLike(todo.id)}>LIKES : {todo.likes}</button>
                    </div>
                    // < TodoItem todo={todo} handleDelete={handleDelete}  handleLike={handleLike}/>
                ))}
            </div>
        </div>
    )
}

export default Todo;