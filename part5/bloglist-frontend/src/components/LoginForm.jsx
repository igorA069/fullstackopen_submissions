import { useState } from "react"
import login from "../services/login"

const LoginForm = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('') 

    const onSubmit = async (event) => {
        event.preventDefault()
        // attempt to login
        try {
            const accessToken = await login(username, password)
            // if successfull, store the token
            props.setAccessToken(accessToken)
            props.setLoggedInUserName(username)
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <div>
    <h2>log in to application</h2>
    <form onSubmit={ onSubmit }>
        <div>
            <label>
                username
                <input value={username} onChange={(event) => setUsername(event.target.value)} type='text'/>
            </label>
        </div>
        <div>
            <label>
                password
                <input value={password} onChange={(event) => setPassword(event.target.value)} type='password'/>
            </label>
        </div>
        <button type='submit'>login</button>
    </form>
    </div>)
}

export default LoginForm