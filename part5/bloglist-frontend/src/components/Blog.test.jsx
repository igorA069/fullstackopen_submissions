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

test('title and author must be rendered, url and likes must not', () => {
  render(<Blog blog={blog}/>)

  // investigate the blog:
  let element
  // title and author must be rendered
  element = screen.getByText(blog.title, { exact:false })
  expect(element).toBeVisible()

  element = screen.getByText(blog.author, { exact:false })
  expect(element).toBeVisible()

  // url and likes must not be visible
  element = screen.queryByText(blog.url, { exact:false })
  expect(element).toBeNull()

  element = screen.queryByText(blog.likes.toString(), { exact:false })
  expect(element).toBeNull()
})

test('url and likes become visible when the view button is clicked', async () => {
  render(<Blog blog={blog}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  let element
  element = screen.queryByText(blog.url, { exact:false })
  expect(element).toBeVisible()

  element = screen.queryByText(blog.likes.toString(), { exact:false })
  expect(element).toBeVisible()
})

test('clicking like button 2x triggers the corresponding even handler 2x', async () => {
  const onClickLike = vi.fn()

  render(<Blog blog={ blog } onClickLike={ onClickLike }/>)
  const user = userEvent.setup()

  // toggle view to make like button visible
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(onClickLike.mock.calls).toHaveLength(2)
})