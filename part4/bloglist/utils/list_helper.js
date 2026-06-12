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

module.exports = { dummy, totalLikes, favoriteBlog }