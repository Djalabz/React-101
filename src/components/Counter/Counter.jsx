import { useState } from 'react'
import './Counter.css'

function Counter() {
    // 1) Données (State)
    const [count, setCount] = useState(0)

    // 2) Fonctions / Comportements 
    function increment() {
        console.log(count)
        setCount(prev => prev + 1)
        console.log(count)
    }

    // 3) On retourne le JSX et on affiche la vue
    return ( 
        <>
            <h1>Counter</h1>
            <div className="counter">
                <p>{count}</p>
                <button onClick={() => increment()}>Add + 1</button>
            </div>
        </>
    )
}

export default Counter