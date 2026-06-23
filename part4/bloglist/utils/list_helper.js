const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => blogs.reduce((acc, curr) => acc + curr.likes, 0)

const favoriteBlog = (blogs) => {
    let result = null
    let mostLikes = -1
    blogs.forEach(blog => {
        if (blog.likes > mostLikes) {
            mostLikes = blog.likes 
            result = blog
        }
    })
    return result
}

const mostBlogs = (blogs) => {
    const blogsGroupedByAuthor = Object.groupBy(blogs, blog => blog.author)
    const authorVsBlogCountArray = Object.entries(blogsGroupedByAuthor).map(([author, blogsOfAuthor]) => [author, blogsOfAuthor.length])
    const result = authorVsBlogCountArray.reduce((acc, [curAuthor, blogCountOfCurAuthor]) => {
        if (blogCountOfCurAuthor > acc.blogs) {
            acc.author = curAuthor
            acc.blogs = blogCountOfCurAuthor
        }
        return acc
    }, { author: undefined, blogs: 0 })
    return result
}

const mostLikes = (blogs) => {
    const blogsGroupedByAuthor = Object.groupBy(blogs, blog => blog.author)
    const getLikesOfAuthor = (blogsOfAuthor) => blogsOfAuthor.reduce((acc, cur) => acc += cur.likes, 0)
    const authorVsLikesArray = Object.entries(blogsGroupedByAuthor).map(([author, blogsOfAuthor]) => [author, getLikesOfAuthor(blogsOfAuthor)])
    const result = authorVsLikesArray.reduce((acc, [curAuthor, blogLikesOfCurAuthor]) => {
        if (blogLikesOfCurAuthor > acc.likes) {
            acc.author = curAuthor
            acc.likes = blogLikesOfCurAuthor
        }
        return acc
    }, { author: undefined, likes: 0 })
    return result
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }