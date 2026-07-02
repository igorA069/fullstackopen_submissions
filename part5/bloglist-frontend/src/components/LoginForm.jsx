import { useState } from 'react'

const LoginForm = ({ onSubmit }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const internalOnSubmit = (event) => {
    event.preventDefault()
    onSubmit(username, password)
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={ event => internalOnSubmit(event) }>
        <div>
          <label>
                username
            <input value={ username } onChange={ event => setUsername(event.target.value) } type='text'/>
          </label>
        </div>
        <div>
          <label>
                password
            <input value={ password } onChange={ event => setPassword(event.target.value) } type='password'/>
          </label>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>)
}

export default LoginForm