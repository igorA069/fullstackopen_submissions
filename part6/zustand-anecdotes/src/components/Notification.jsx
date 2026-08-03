import { useNotificationMessage } from "../notificationStore"

const Notification = () => {
  const notificationText = useNotificationMessage()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  if (!notificationText) {
    return null
  }
  return <div style={style}>{notificationText}</div>
}

export default Notification