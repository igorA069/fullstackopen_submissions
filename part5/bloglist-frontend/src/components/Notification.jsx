const Notification = (props) => {
  const textStyle = {
    color: props.isError ? 'red' : 'green',
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '5px'
  }
  if (props.text) {
    return(
      <div style={textStyle}>
        {props.text}
      </div>)
  } else {
    return null
  }
}

export default Notification