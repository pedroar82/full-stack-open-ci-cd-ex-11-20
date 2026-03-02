import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('new blog form', async () => {
  const createBlogFunc = vi.fn()
  const user = userEvent.setup()

  const { container } =  render(<BlogForm createBlog={createBlogFunc} />)
  const title = container.querySelector('#title')
  const author = container.querySelector('#author')
  const url = container.querySelector('#url')
  const sendButton = screen.getByText('create')

  await user.type(title, 'testing title...')
  await user.type(author, 'testing author...')
  await user.type(url, 'testing url...')
  await user.click(sendButton)

  expect(createBlogFunc.mock.calls).toHaveLength(1)
  expect(createBlogFunc.mock.calls[0][0].title).toBe('testing title...')
})