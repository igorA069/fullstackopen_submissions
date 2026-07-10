import { test, vi, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CreateBlogForm from './CreateBlogForm'

test('Check that the correct event handler is called with the right parameters', async () => {
  const onSubmit = vi.fn()
  render(<CreateBlogForm onSubmit={ onSubmit }/>)

  const user = userEvent.setup()
  // uncollapse the form first
  const showButton = screen.getByText('create new blog')
  await user.click(showButton)

  const titleElement = screen.getByLabelText('title')
  const authorElement = screen.getByLabelText('author')
  const urlElement = screen.getByLabelText('url')
  const createButton = screen.getByText('create')

  await user.type(titleElement, 'TestTitle')
  await user.type(authorElement, 'TestAuthor')
  await user.type(urlElement, 'TestUrl')
  await user.click(createButton)

  expect(onSubmit.mock.calls).toHaveLength(1)
  expect(onSubmit.mock.calls[0]).toStrictEqual(['TestTitle', 'TestAuthor', 'TestUrl'])
})