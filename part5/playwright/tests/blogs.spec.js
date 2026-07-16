const { test, describe, expect, beforeEach } = require('@playwright/test')
const { login, createBlog, likeBlog } = require('./helper')

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
           await likeBlog(page, 'NewTitle', 'NewAuthor', true)
           const blogElement = page.getByText('NewTitle NewAuthor')
           await expect(blogElement.getByText('likes 1')).toBeVisible()
        })

        test('Blog can be removed', async ({ page }) => {
           await createBlog(page, 'NewTitle', 'NewAuthor', 'NewUrl')

           const blogElement = page.getByText('NewTitle NewAuthor')
           await blogElement.getByRole('button', { name:'view' }).click()
           
           // Register a dialog handler that shall accept the dialog, before clicking delete
           page.on('dialog', dialog => dialog.accept())
           // press delete, which shall bring up the confirmation dialog
           await blogElement.getByRole('button', { name:'remove' }).click()

           await expect(blogElement).not.toBeVisible()
        })

        test('Blogs are ordered by the likes count, in descending order', async ({ page }) => {
            // create 3 blogs
            await createBlog(page, 'NewTitle1', 'NewAuthor1', 'NewUrl1')
            await createBlog(page, 'NewTitle2', 'NewAuthor2', 'NewUrl2')
            await createBlog(page, 'NewTitle3', 'NewAuthor3', 'NewUrl3')

            // desired like count:
            const blog1likes = 2
            const blog2likes = 3
            const blog3likes = 1
            // resulting expected order:
            const expectedMostLikedTitle = 'NewTitle2'
            const expected2ndMostLikedTitle = 'NewTitle1'
            const expected3rdMostLikedTitle = 'NewTitle3'
            // click corresp. like button to achieve the desired resp. like count
            for (let i = 0; i < blog1likes; i++) {
                await likeBlog(page, 'NewTitle1', 'NewAuthor1', i === 0)
            }
            for (let i = 0; i < blog2likes; i++) {
                await likeBlog(page, 'NewTitle2', 'NewAuthor2', i === 0)
            }
            for (let i = 0; i < blog3likes; i++) {
                await likeBlog(page, 'NewTitle3', 'NewAuthor3', i === 0)
            }

            // locate 1st, 2nd and 3rd blog on page and check if they have the resp. expected title
            const actualHighestBlog     = page.getByRole('button', { name: 'hide' }).nth(0).locator('..')
            const actual2ndHighestBlog  = page.getByRole('button', { name: 'hide' }).nth(1).locator('..')
            const actual3rdHighestBlog  = page.getByRole('button', { name: 'hide' }).nth(2).locator('..')

            await expect(actualHighestBlog.     getByText(expectedMostLikedTitle)).toBeVisible()
            await expect(actual2ndHighestBlog.  getByText(expected2ndMostLikedTitle)).toBeVisible()
            await expect(actual3rdHighestBlog.  getByText(expected3rdMostLikedTitle)).toBeVisible()
        })
    })

    test('Only the user who added the blog sees the blog delete button', async ({ page, request }) => {
        // login as user1
        await login(page, 'user1', 'user1password')
        // create blog
        await createBlog(page, 'NewTitle', 'NewAuthor', 'NewUrl')
        // logout
        page.getByRole('button', { name: 'logout' }).click()

        // create second user in DB
        await request.post('http://localhost:3003/api/users', { 
            data: {
                username: 'user2',
                name: 'user2name',
                password: 'user2password'
            }
        })
        // login as user2
        await login(page, 'user2', 'user2password')
        // blog of user1 shall be visible, but the delete button shall not
        const blogElement = page.getByText('NewTitle NewAuthor')
        await blogElement.getByRole('button', { name: 'view' }).click()
        await expect(blogElement.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
})