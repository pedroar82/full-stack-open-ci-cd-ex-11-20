const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./tests_helper')
const api = supertest(app)
const mongoose = require('mongoose')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'pedroar',
      name: 'Pedro Araújo',
      password: 'pass',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('invalid username', async () => {
    const invalidUser = {
      username: 'pe',
      name: 'Pedro Araújo',
      password: 'pass',
    }

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, 1)
  })

  test('invalid passowrd', async () => {
    const invalidUser = {
      username: 'pedroar',
      name: 'Pedro Araújo',
      password: 'ps',
    }

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})