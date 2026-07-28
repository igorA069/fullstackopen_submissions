import { useCounterGood, useCounterNeutral, useCounterBad } from '../store'

const Statistics = () => {
  const counterGood = useCounterGood()
  const counterNeutral = useCounterNeutral()
  const counterBad = useCounterBad()

  const all = counterGood + counterNeutral + counterBad
  const average = all ? ((counterGood - counterBad) / all) : 0
  const positive = all ? (counterGood / all) : 0
  
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{counterGood}</td></tr>
          <tr><td>neutral</td><td>{counterNeutral}</td></tr>
          <tr><td>bad</td><td>{counterBad}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{average}</td></tr>
          <tr><td>positive</td><td>{positive * 100} %</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
