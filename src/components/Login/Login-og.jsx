import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'


function Login() {
    const [formData, setFormData] = useState()
    const [value, setValue] = useState({
        username: '',
        password: '',
    }) 

    useEffect(() => {
        axios.post('http://localhost:3000/login/new', formData)
        .then((res) => {
          console.log(res.data)
          if (res.data == 200) {
            navigate('/home')
          } 
        })
        .catch((err) => console.log(err))
      }, [formData]);


    const handleChange = (e) => {
        setValue(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (value.username != '' && value.password != '') {
            const data = new FormData(e.target)
            const newFormData = Object.fromEntries(data.entries())
            setFormData(newFormData)
        } else {
            setError('Missing fields')
        }
    }

    return ( 
    <form onSubmit={(e) => handleSubmit(e)} className="login">
        <input 
            type="username" 
            name='username' 
            placeholder='username'
            onChange={(e) => handleChange(e)} 
            value={value.username} />
        <input 
            type="password" 
            name='password' 
            onChange={(e) => handleChange(e)} 
            value={value.password} 
            placeholder='password' />
        <button type="submit">Login</button>
    </form> );
}

export default Login;