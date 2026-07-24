import { Paper, Typography, Button } from "@mui/material"

const Blog = ({ blog, isLikeable, onClickLike, isDeletable, onClickDelete }) => {

  return (
    <Paper elevation={3} sx={{p: 2, mt: 2}}>
      <Typography variant='h4' gutterBottom>{blog.title}</Typography>
      <Typography variant='h6' gutterBottom>by {blog.author}</Typography>
      <Typography variant='body2' gutterBottom><a href={blog.url}>{blog.url}</a></Typography>
      <Typography variant='body2' gutterBottom>Added by {blog.user.name}</Typography>
      <Typography variant='body1' gutterBottom>{blog.likes} likes
        { isLikeable && <Button onClick={ onClickLike } variant='outlined' size='small' sx={{ ml:1 }}>like</Button> }
        { isDeletable && <Button onClick={ onClickDelete } color='error' variant='outlined' size='small' sx={{ ml:1 }}>remove</Button>}
      </Typography>
    </Paper>
  )
}

export default Blog