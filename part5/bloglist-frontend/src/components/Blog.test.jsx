import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'

import Blog from './Blog'

test('title and author must be rendered, url and likes must not', () => {
  // instantiate a blog
  const blog = {
    title: 'Title',
    author:'Author',
    url:'URL',
    likes: 42,
    user: { name: 'Name' }
  }
  render(<Blog blog={blog}/>)

  // investigate the blog:
  let element
  // title and author must be rendered
  element = screen.getByText(blog.title, { exact:false })
  expect(element).toBeDefined()

  element = screen.getByText(blog.author, { exact:false })
  expect(element).toBeDefined()

  // url and likes must not be visible
  element = screen.queryByText(blog.url, { exact:false })
  expect(element).toBeNull()

  element = screen.queryByText(blog.likes.toString(), { exact:false })
  expect(element).toBeNull()
})