import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify'

import axios from 'axios'

function Form() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState('')
  const [value, setValue] = useState({
      username: "",
      email: "",
      password: "",
      confirm:"",
  })

  const regex_password = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,32}$/
  const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ 

  useEffect(() => {
    axios.post(`http://localhost:3000/signup/add`, formData)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }, [formData])

  function handleChange(e) {
      setValue({ ...value, [e.target.name]: e.target.value })
  }     

  function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target)

    const newFormData = Object.fromEntries(data.entries())
    
    if ((newFormData.password === newFormData.confirm)
        && regex_password.test(newFormData.password)
        && regex_email.test(newFormData.email) 
        && newFormData.username && newFormData.email) {
            // Sanitize pour le html
            DOMPurify.sanitize(newFormData.username)
            setFormData(newFormData)
        } else if (newFormData.password !== newFormData.confirm) {
            setError('Different passwords')
            return
        } else if (!regex_email.test(newFormData.email)) {
            setError('Email format is not valid')
            return
        } else if (!regex_password.test(newFormData.password)) {
            setError('Password must have one lowercase letter, one uppercase, a number, a special character and contains at least 8 elements.')
            console.log(Object.keys(formData))
            return
        } 
        else {
            setError('Missing Fields')
            return
        }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      { (!Object.keys(formData).includes('email')) ?  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create a new account
        </h2>
      </div>
        <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
              </label>

              <input
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-0"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
              </label>

                <input
                  id="email"
                  name="email"
                  // type="email"
                  autoComplete="email"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-0"
                />
              </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-0"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm your password
              </label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                autoComplete="confirm-password"
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-0"
              />
            </div>
          <div>
          {error && <p className='error mb-4'>{error}</p>}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      : 
      <div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Inscription réussie !
        </h2>
        </div><p className='mb-4'>Un mail de confirmation vous a été envoyé.</p>
        <a href="/login">Login</a>
      </div>}
    </div>
  );
}

export default Form