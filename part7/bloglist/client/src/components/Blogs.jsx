import { Link } from "react-router";

import { useBlogs } from "../store/blogStore";

const Blogs = () => {
  const blogs = useBlogs();

  const sortedBlogs = [...blogs].sort(
    (blog1, blog2) => blog2.likes - blog1.likes,
  );
  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {sortedBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
