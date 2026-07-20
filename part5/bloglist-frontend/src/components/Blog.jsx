const Blog = ({ blog, isLikeable, onClickLike, isDeletable, onClickDelete }) => {

  return (
    <div>
      <h2>{blog.author}: {blog.title}</h2>
      <a href={blog.url}>{blog.url}</a><br/>
      likes {blog.likes} { isLikeable && <button onClick={ onClickLike }>like</button> }<br/>
      Added by {blog.user.name}<br/>
      {isDeletable && <button onClick={ onClickDelete }>remove</button>}
    </div>
  )
}

export default Blog