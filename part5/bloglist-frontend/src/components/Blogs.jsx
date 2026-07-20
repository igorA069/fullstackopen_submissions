import Blog from "./Blog"

const Blogs = ({ blogs, onLikeBlog, onDeleteBlog, username }) => {
    const sortedBlogs = [...blogs].sort((blog1, blog2) => (blog2.likes - blog1.likes))
    return (
        <div>
            <h2>blogs</h2>
            { sortedBlogs.map(blog => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    onClickLike={ () => onLikeBlog(blog) }
                    isDeletable={ blog.user.username === username }
                    onClickDelete={ () => onDeleteBlog(blog) }
                />
            )) }
        </div>)
}

export default Blogs