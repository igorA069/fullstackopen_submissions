import { useState } from "react"

const Blog = ({ blog }) => {
  const [isCollapsed, setCollapsed] = useState(true)

  const style = {
    borderStyle: 'none',
    borderRadius: '5px',
    background: 'lightgrey',
    padding: '5px',
    margin: '5px'
  }

  const toggleCollapsed = () => setCollapsed(!isCollapsed)

  return (
    <div style={style}>
      {blog.title} {blog.author} <button onClick={ toggleCollapsed }>{ isCollapsed ? 'view' : 'hide' }</button>
      {!isCollapsed && (
        <div>
          <br/>
          {blog.url}<br/>
          likes {blog.likes} <button>like</button><br/>
          {blog.user.name}
        </div>
      )}
    </div>  
  )
}

export default Blog