import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, userId }) => {
  const [showDetail, setShowDetail] = useState(false)

  const showWhenVisible = { display: showDetail ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButton = {
    background: 'linear-gradient(to bottom, #4fa3ff, #1b2edcff)',
    border: '1px solid #185bb5',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '11px'
  }

  const toggleView = () => {
    setShowDetail(!showDetail)
  }

  const likeBlog = () => {
    updateBlog(blog.id, blog.likes+1)
  }

  const handleDelete = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author} `)){
      deleteBlog(blog.id)
    }
  }

  return (
    <div className="blogStyle" data-testid="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleView} >{ showDetail ? 'hide' : 'view'}</button>
      </div>
      <div className="showWhenVisible" style={showWhenVisible}>
        <p>{blog.url}</p>
        <p><span data-testid="likes">{blog.likes}</span> <button onClick={likeBlog}>like</button></p>
        <p>{blog.user ? blog.user.name : ''}</p>
        {userId=== blog.user.id
          ?  <button style={deleteButton} onClick={handleDelete}>delete</button>
          : null
        }
      </div>
    </div>
  )
}

export default Blog