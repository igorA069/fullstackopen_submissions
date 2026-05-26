import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr> 
  )
} 

const Statistics = (props) =>
{
  let contents = (
    <>
    No feedback given
    </>
  )
  const total = props.good + props.neutral + props.bad
  if (total > 0) {
    contents = (
      <table>
        <tbody>
          <StatisticsLine text='good' value={props.good}/>
          <StatisticsLine text='neutral' value={props.neutral}/>
          <StatisticsLine text='bad' value={props.bad}/>
          <StatisticsLine text='total' value={total}/>
          <StatisticsLine text='average (1 = good, -1 = bad)' value={(props.good - props.bad)/(props.good + props.bad)}/>
          <StatisticsLine text='positive ratio' value={(props.good / total * 100) + "%"}/>
        </tbody>
      </table>
    )
  }

  return (
    <>
    <h1>Statistics</h1>
    {contents}
    </> 
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
      <div>
        <h1>Give feedback</h1>
        <Button onClick={() => { setGood(good + 1) }} text='good' /> 
        <Button onClick={() => { setNeutral(neutral + 1) }} text='neutral'/>
        <Button onClick={() => { setBad(bad + 1) }} text='bad'/>

        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>

  )
}

export default App
