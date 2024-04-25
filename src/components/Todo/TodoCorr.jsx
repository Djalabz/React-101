import { useState } from 'react'
import './Todo.css'
import TodoItem from './TodoItem'
import AddCircleIcon from '@mui/icons-material/AddCircle'


function Todo() {
    // Ici on gére nos states : todo simple, liste de todo, et notre liste de todo qui ont été check
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])


    // Ici nos comportements (add, delete, check)
    const addTodo = () => {
        if (todo != '') {
            const todoItem = {
                id: Math.floor(Math.random() * 9000),
                task : todo,
                check: false,
                likes: 0,
            }
            setTodos(todos => [ ...todos, todoItem])
            setTodo('')
        }
    }

    const handleCheck = (id) => {
        const copyItem = [...todos]
        const indexOf = copyItem.findIndex(todo => todo.id = id)
        copyItem[indexOf].check = !copyItem[indexOf].check
        setTodos(copyItem)
    }


    const deleteTodo = (id) => {
        setTodos(prev => prev.filter(todo => todo.id != id))
    }

    const handleLike = (id) => {
        setTodos(todos => 
            todos.map(item => 
            item.id === id ?
            { ...item, likes: item.likes + 1} : item))
    }

    return (
      <>
        <h1>Ma Todo !</h1>
        <div className="head-todo">
          <input
            type="text"
            className="input todos"
            placeholder="Ajouter tache ..."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <AddCircleIcon
            sx={{ cursor: "pointer", fontSize: "2.5rem", marginLeft: "1rem" }}
            onClick={() => addTodo()}
          />
        </div>
        <ul className="list-todos">
            {todos.map((item) => {
                return (
                    < TodoItem item={item} handleLike={handleLike} handleCheck={handleCheck} deleteTodo={deleteTodo} />
                )
            })}
        </ul>
      </>
    );
}

export default Todo