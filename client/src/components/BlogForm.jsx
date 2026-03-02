import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title: <input id='title' value={title}
          onChange={e => setTitle(e.target.value)} />
      </div>
      <div>author: <input id='author' value={author}
        onChange={e => setAuthor(e.target.value)} /></div>
      <div>
        <div>url: <input id='url' value={url}
          onChange={e => setUrl(e.target.value)}/></div>
        <div></div>
        <button type="submit" >create</button>
      </div>
    </form>
  )
}

export default BlogForm