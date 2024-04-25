import { useState, useEffect } from 'react'
import axios from 'axios'

function Effect() {
    const [count, setCount] = useState(0)

    useEffect(() => 
        postMessage(), 
        [])

    let message = {
        type: 'message',
        content: 'Salut !'
    }

    function postMessage() {
        axios.post('http://localhost:3000/effect', message)
        .then(res => console.log(res))
        .catch((err) => console.log(err))
    }

    return (
        <div className="effect">
            {count}
            <button onClick={() => setCount(prev => prev+1)}>+1</button>
        </div>
    );
}

export default Effect;