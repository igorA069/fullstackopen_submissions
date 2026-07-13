const login = async (page, user, password) => {
    await page.getByRole('textbox', {name: 'user'}).fill(user)
    await page.getByRole('textbox', {name: 'password'}).fill(password)
    await page.getByRole('button', {name: 'login'}).click()
}

module.exports = { login }