const Buttons = ({ onClickGood, onClickNeutral, onClickBad}) => {
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={ onClickGood }>good</button>
      <button onClick={ onClickNeutral }>neutral</button>
      <button onClick={ onClickBad }>bad</button>
    </div>
  )
}

export default Buttons
