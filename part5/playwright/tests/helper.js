const login = async (page, user, password) => {
    await page.getByRole('link', { name: 'login' }).click()

    await page.getByRole('textbox', {name: 'username'}).fill(user)
    await page.getByRole('textbox', {name: 'password'}).fill(password)
    await page.getByRole('button', {name: 'login'}).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('link', { name: 'new blog' }).click()

    await page.getByLabel('title').fill(title)
    await page.getByLabel('author').fill(author)
    await page.getByLabel('url').fill(url)
    await page.getByRole('button', { name: 'create' }).click()

    await page.getByRole('button', { name: 'create' }).waitFor({ state: 'hidden'})
}

const likeBlog = async (page, title, author) => {
    const blogElement = page.getByText(`${title} by ${author}`)
    await blogElement.click()
    const likeButton = page.getByRole('button', { name:'like' })
    await likeButton.click()
}

module.exports = { login, createBlog, likeBlog }