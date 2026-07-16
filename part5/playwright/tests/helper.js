const login = async (page, user, password) => {
    await page.getByRole('textbox', {name: 'user'}).fill(user)
    await page.getByRole('textbox', {name: 'password'}).fill(password)
    await page.getByRole('button', {name: 'login'}).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'create new blog' }).click()

    await page.getByLabel('title').fill(title)
    await page.getByLabel('author').fill(author)
    await page.getByLabel('url').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
}

const likeBlog = async (page, title, author, isCollapsed) => {
    const blogElement = page.getByText(`${title} ${author}`)
    if (isCollapsed) {
        // expand first:
        const viewButton = blogElement.getByRole('button', { name:'view' })
        await viewButton.click()
    } 
    const likeButton = blogElement.getByRole('button', { name:'like' })
    await likeButton.click()
}

module.exports = { login, createBlog, likeBlog }