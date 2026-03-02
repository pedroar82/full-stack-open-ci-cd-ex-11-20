const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

//router required for exercise 7.16: Blog View, it gives one single blog
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blog)
})

//router required for exercise 7.18: Comments, step 1, it gives the comments for a single blog
blogsRouter.get('/comments/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog.comments || [])
})

//router required for exercise 7.19: Comments, step 2
blogsRouter.put('/comments/:id', userExtractor, async (request, response) => {
  const { title, author, url, user, likes, comments } = request.body
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(400).json({ error: 'Blog Id missing or not valid' })
  }

  const blogUpdated = {
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user.id,
    comments: comments
  }

  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blogUpdated, { new: true })
  response.status(200).json(savedBlog)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  const { title, author, url, likes } = body

  if (!title || !url) {
    return response.status(400).json({ error: 'title or url are missing' })
  }

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  if (!user.blogs) user.blogs = []
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  //ensure that the full info about the user
  const savedBlogPop = await savedBlog.populate('user', { username: 1, name: 1, id: 1 })
  response.status(201).json(savedBlogPop)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }

  if ( blog.user.toString() !== user._id.toString() ){
    return response.status(403).json({ error: 'permission denied' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const { title, author, url, user, likes } = request.body
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(400).json({ error: 'Blog Id missing or not valid' })
  }

  const blogUpdated = {
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user.id
  }

  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blogUpdated, { new: true })
  const savedBlogPop = await savedBlog.populate('user', { username: 1, name: 1, id: 1 })
  response.status(200).json(savedBlogPop)
})

module.exports = blogsRouter