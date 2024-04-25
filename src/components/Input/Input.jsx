import { useState } from 'react'

function Input() {
    const [value, setValue] = useState('')

    function handleChange(e) {
        setValue(e.target.value)
    }

    return ( 
        <>
            <h1>State exercice</h1>
            <input 
                onChange={(e) => handleChange(e)} 
                type="text" 
                value={value}>
            </input>
            <p>{value}</p>
        </>
    );
}

export default Input;