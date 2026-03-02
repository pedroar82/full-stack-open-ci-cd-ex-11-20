const dummy = () => {
  return 1
}

const totalLikes  = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, item) => {
      return sum + item.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((mostLikes, item) =>
  {return mostLikes.likes >= item.likes ? mostLikes : item})
}

const mostBlogs = (blogs) => {
  let result = []
  blogs.forEach(blog => {
    const found = result.find(bl => bl.author === blog.author)
    found ? found.blogs++ : result.push({ author: blog.author, blogs: 1 })
  })

  return result.reduce((mostBlogs, item) =>
  {return mostBlogs.blogs >= item.likes ? mostBlogs : item})
}

const mostLikes = (blogs) => {
  let result = []
  blogs.forEach(blog => {
    const found = result.find(bl => bl.author === blog.author)
    found ? found.likes+=blog.likes : result.push({ author: blog.author, likes:blog.likes })
  })

  return result.reduce((mostLikes, item) =>
  {return mostLikes.likes >= item.likes ? mostLikes : item})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}