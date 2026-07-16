const { test, describe, expect, beforeEach } = require('@playwright/test')
const { login } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        // empty db
        await request.post('http://localhost:3003/testing/reset')
        // create a user
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'user1',
                name: 'user1name',
                password: 'user1password'
            }
        })
        await page.goto('http://localhost:5173/')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByText('log in to application')).toBeVisible()
        await expect(page.getByRole('textbox', { name: 'username' })).toBeVisible()
        await expect(page.getByRole('textbox', { name: 'password' })).toBeVisible()
    })

    describe('Login', () => {
        test('Success with correct credentials', async ({ page }) => {
            await login(page, 'user1', 'user1password')
            await expect(page.getByText('user1 logged in')).toBeVisible()
        })

        test('Failure with existing user but wrong password', async ({ page }) => {
            await login(page, 'user1', '1234')
            await expect(page.getByText('user1 logged in')).not.toBeVisible()
        })

        test('Failure with unknown user', async ({ page }) => {
            await login(page, 'unknown', '1234')
            await expect(page.getByText('user1 logged in')).not.toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await login(page, 'user1', 'user1password')
        })

        test('Logged in user can create a blog', async ({ page }) => {
            const showCreateFormButton = page.getByRole('button', { name: 'create new blog' })
            await expect(page.getByRole('button', { name: 'create new blog' })).toBeVisible()
            
            await createBlog(page, 'NewTitle', 'NewAuthor', 'NewUrl')

            await expect(page.getByText('NewTitle NewAuthor')).toBeVisible()
        })

        test('Blog can be liked', async ({ page }) => {
           await createBlog(page, 'NewTitle', 'NewAuthor', 'NewUrl')

           const blogElement = page.getByText('NewTitle NewAuthor')
           await blogElement.getByRole('button', {name:'view'}).click()
           await blogElement.getByRole('button', {name:'like'}).click()

           await expect(blogElement.getByText('likes 1')).toBeVisible()
        })

        const createBlog = async (page, title, author, url) => {
            await page.getByRole('button', { name: 'create new blog' }).click()

            await page.getByLabel('title').fill(title)
            await page.getByLabel('author').fill(author)
            await page.getByLabel('url').fill(url)
            await page.getByRole('button', { name: 'create' }).click()
        }
    })
})