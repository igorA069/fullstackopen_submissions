const { test, describe, expect, beforeEach } = require('@playwright/test')

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
            await page.getByRole('textbox', {name: 'user'}).fill('user1')
            await page.getByRole('textbox', {name: 'password'}).fill('user1password')
            await page.getByRole('button', {name: 'login'}).click()
            await expect(page.getByText('user1 logged in')).toBeVisible()
        })

        test('Failure with existing user but wrong password', async ({ page }) => {
            await page.getByRole('textbox', {name: 'user'}).fill('user1')
            await page.getByRole('textbox', {name: 'password'}).fill('1234')
            await page.getByRole('button', {name: 'login'}).click()
            await expect(page.getByText('user1 logged in')).not.toBeVisible()
        })

        test('Failure with unknown user', async ({ page }) => {
            await page.getByRole('textbox', {name: 'user'}).fill('unknown')
            await page.getByRole('textbox', {name: 'password'}).fill('1234')
            await page.getByRole('button', {name: 'login'}).click()
            await expect(page.getByText('user1 logged in')).not.toBeVisible()
        })
    })
})