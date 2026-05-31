const notificationStyle = {
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '5px',
    fontSize: '20px',
    marginBottom: '15px'
}

const Notification = ({text, isError}) => {
    if (text === '') {
        return null
    }
    else {
        const style = isError ? {...notificationStyle, color:'red', borderColor:'red'} : {...notificationStyle, color:'green', borderColor:'green'}
        return <div style={style}>{text}</div>
    }
}

export default Notification