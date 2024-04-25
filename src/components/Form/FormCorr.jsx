import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from './FormInput'
import axios from 'axios'

import './Form.css'

const inputs = [
    {
        id: '1',
        name: "username",
        type: "text",
        placeholder: "your name here",
        label: "username"
    },
    {
        id: '2',
        name: "email",
        type: "text",
        placeholder: "your email here",
        label: "email"
    },
    {
        id: '3',
        name: "password",
        type: "password",
        placeholder: "your password",
        label: "password"
    },
    {
        id: '4',
        name: "confirm",
        type: "password",
        placeholder: "confirm password",
        label: "confirm"
    }
]


function Form() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState('')
  const [value, setValue] = useState({
      username: "",
      email: "",
      password: "",
      confirm:"",
  })

  const navigate = useNavigate()

  useEffect(() => {
    axios.post('http://localhost:3000/signup/add', formData)
    .then((res) => {
      console.log(res.data)
      if (res.data == 200) {
        navigate('/login')
      } else if (res.data === 'email already taken') {
        setError('Email already taken')
      }
    })
    .catch((err) => console.log(err))
  }, [formData]);


  function handleChange(e) {
      setValue({ ...value, [e.target.name]: e.target.value })
  }     

  function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);

    const newFormData = Object.fromEntries(data.entries());

    console.log(newFormData)

    if ((newFormData.password === newFormData.confirm) 
      && newFormData.username && newFormData.email) {
        setFormData(newFormData)
        setError('')}
    else if (newFormData.password !== newFormData.confirm) {
      setError('Different Password')
    } 
    else {
      setError('Missing fields')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Mon formulaire</h1>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          handleChange={handleChange}
          value={value[input.name]}
        />
      ))}
      {error && <p className='error'>{error}</p>}
      <button className='signup-submit' type="submit">Envoyer</button>
    </form>
  );
}

export default Form