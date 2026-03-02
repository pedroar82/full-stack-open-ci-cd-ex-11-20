const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  },
  {
    title: 'A Guide to Express Middleware',
    author: 'Mary Johnson',
    url: 'https://example.com/express-middleware',
    likes: 15
  },
  {
    title: 'Async/Await Tips',
    author: 'John Doe',
    url: 'https://example.com/async-await',
    likes: 99
  },
  {
    title: 'Other article',
    author: 'John Doe',
    url: 'https://example.com/other',
    likes: 11
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})

describe('favorite Blog', () => {
  test('favorite Blog is', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[2])
  })
})

describe('most Blogs', () => {
  test('author who has the largest amount of blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    const expectedRes = { author: 'John Doe', blogs: 2 }
    assert.deepStrictEqual(result, expectedRes)
  })
})

describe('most likes', () => {
  test('the author whose blog posts have the largest amount of likes', () => {
    const result = listHelper.mostLikes(blogs)
    const expectedRes = { author: 'John Doe', likes: 110 }
    assert.deepStrictEqual(result, expectedRes)
  })
})

