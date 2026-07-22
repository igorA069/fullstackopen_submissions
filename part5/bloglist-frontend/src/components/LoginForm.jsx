import { useState } from 'react'
import { Button, TextField } from '@mui/material'
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
          <TextField 
            value={ username } 
            onChange={ event => setUsername(event.target.value) } 
            type='text' 
            label='username' 
            variant='standard'
            size='small' 
          />
        </div>
        <div>
          <TextField 
            value={ password } 
            onChange={ event => setPassword(event.target.value) } 
            type='password' 
            label='password' 
            variant='standard'
            size='small' 
          />
        </div>
        <Button type='submit' variant='contained' sx={{ mt: 1 }}>
          login
        </Button>
      </form>
    </div>)
}

export default LoginForm