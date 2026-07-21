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
        await page.getByRole('link', { name: 'login' }).click()
        await expect(page.getByText('log in to application')).toBeVisible()
        await expect(page.getByRole('textbox', { name: 'username' })).toBeVisible()
        await expect(page.getByRole('textbox', { name: 'password' })).toBeVisible()
    })

    describe('Login', () => {
        test('Success with correct credentials', async ({ page }) => {
            await login(page, 'user1', 'user1password')
            await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
        })

        test('Failure with existing user but wrong password', async ({ page }) => {
            await login(page, 'user1', '1234')
            await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible()
        })

        test('Failure with unknown user', async ({ page }) => {
            await login(page, 'unknown', '1234')
            await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await login(page, 'user1', 'user1password')
        })

        test('Logged in user can create a blog', async ({ page }) => {
            await expect(page.getByRole('link', { name: 'new blog' })).toBeVisible()
            
            await createBlog(page, 'NewTitle', 'NewAuthor', 'NewUrl')

            await expect(page.getByText('NewTitle by NewAuthor')).toBeVisible()
        })

        test('Blog can be liked', async ({ page }) => {
           await createBlog(page, 'NewTitle', 'NewAuthor', 'NewUrl')
           await likeBlog(page, 'NewTitle', 'NewAuthor')
           await expect(page.getByText('likes 1')).toBeVisible()
        })

        test('Blog can be removed', async ({ page }) => {
           await createBlog(page, 'NewTitle', 'NewAuthor', 'NewUrl')

           const blogElement = page.getByText('NewTitle by NewAuthor')
           await blogElement.click()
           
           // Register a dialog handler that shall accept the dialog, before clicking delete
           page.on('dialog', dialog => dialog.accept())
           // press delete, which shall bring up the confirmation dialog
           await page.getByRole('button', { name:'remove' }).click()

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
                await likeBlog(page, 'NewTitle1', 'NewAuthor1')
                await page.getByRole('link', { name: 'blogs' }).click()
            }
            for (let i = 0; i < blog2likes; i++) {
                await likeBlog(page, 'NewTitle2', 'NewAuthor2')
                await page.getByRole('link', { name: 'blogs' }).click()
            }
            for (let i = 0; i < blog3likes; i++) {
                await likeBlog(page, 'NewTitle3', 'NewAuthor3')
                await page.getByRole('link', { name: 'blogs' }).click()
            }

            // locate 1st, 2nd and 3rd blog on page and check if they have the resp. expected title
            const actualHighestBlog     = page.getByRole('link', { name: ' by ' }).nth(0)
            const actual2ndHighestBlog  = page.getByRole('link', { name: ' by ' }).nth(1)
            const actual3rdHighestBlog  = page.getByRole('link', { name: ' by ' }).nth(2)

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
        const blogElement = page.getByText('NewTitle by NewAuthor')
        await blogElement.click()
        await expect(blogElement.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
})