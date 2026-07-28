import { useState } from 'react'
import Buttons from './components/Buttons'
import Statistics from './components/Statistics'

const App = () => {
  const [counterGood, setCounterGood] = useState(0)
  const [counterNeutral, setCounterNeutral] = useState(0)
  const [counterBad, setCounterBad] = useState(0)

  const onClickGood = () => { setCounterGood(counterGood + 1) }
  const onClickNeutral = () => { setCounterNeutral(counterNeutral + 1) }
  const onClickBad = () => { setCounterBad(counterBad + 1) }

  return (
    <>
      <h1>Unicafe</h1>
      <Buttons onClickGood={onClickGood} onClickNeutral={onClickNeutral} onClickBad={onClickBad}/>
      <Statistics counterGood={counterGood} counterNeutral={counterNeutral} counterBad={counterBad} />
    </>
  )
}

export default App
