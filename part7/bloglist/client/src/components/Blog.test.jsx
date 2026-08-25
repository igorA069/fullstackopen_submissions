import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

// instantiate a blog
const blog = {
  title: 'Title',
  author:'Author',
  url:'URL',
  likes: 42,
  user: { name: 'Name' }
}

test('title, author, url and likes must always be rendered', () => {
  render(<Blog blog={blog} isLikeable={false} isDeletable={false}/>)

  // investigate the blog:
  let element
  // title and author must be rendered
  element = screen.getByText(blog.title, { exact:false })
  expect(element).toBeVisible()

  element = screen.getByText(blog.author, { exact:false })
  expect(element).toBeVisible()

  // url and likes must be visible
  element = screen.queryByText(blog.url, { exact:false })
  expect(element).toBeVisible

  element = screen.queryByText(blog.likes.toString(), { exact:false })
  expect(element).toBeVisible()
})

test('like and delete buttons must not be shown to unauthenticated users', () => {
  render(<Blog blog={blog} isLikeable={false} isDeletable={false}/>)

  expect(screen.queryByRole('button')).toBeNull()
})

test('like button must be shown to authenticated users', () => {
  render(<Blog blog={blog} isLikeable={true} isDeletable={false}/>)

  const button = screen.getByRole('button', { name: 'like' })
  expect(button).toBeVisible()
})

test('blog creator is shown the delete button', () => {
  render(<Blog blog={blog} isLikeable={true} isDeletable={true}/>)

  const button = screen.getByRole('button', { name: 'remove' })
  expect(button).toBeVisible()
})

test('clicking like button 2x triggers the corresponding even handler 2x', async () => {
  const onClickLike = vi.fn()

  render(<Blog blog={ blog } isLikeable={true} onClickLike={ onClickLike }/>)
  const user = userEvent.setup()

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(onClickLike.mock.calls).toHaveLength(2)
})