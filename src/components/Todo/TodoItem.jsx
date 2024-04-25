import LikeBtn from './LikeBtn';
import './TodoItem.css'


function TodoItem(props) {

    const { deleteTodo, handleLike, todo } = props

    return ( 
    <li className='todo-item' key={item.id} style={item.check ? { opacity: 0.5 } : { opacity: 1 }}>
        <p>{item.task}</p>
        <div className="btns-todos">
            <LikeBtn item={item} handleLike={handleLike} />
            <a
                className='close-btn' 
                onClick={() => deleteTodo(item.id)}>
                x
            </a>
        </div>
    </li>
    )
}

export default TodoItem