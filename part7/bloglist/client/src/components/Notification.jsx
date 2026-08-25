import { Alert } from "@mui/material"
const Notification = (props) => {
  if (props.text) {
    return <Alert severity={ props.isError ? 'error' : 'success'} sx={{ mt: 2 }}>{ props.text }</Alert>
  } else {
    return null
  }
}

export default Notification