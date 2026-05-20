// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
//import './App.css'

const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const usr_name = 'Peter'
  const usr_age=10
  return (
    <>
      <h1>Greetings</h1>
      <Hello name='George' age={27}/>
      <Hello name={usr_name} age={usr_age}/>
    </>
  )
}

export default App
