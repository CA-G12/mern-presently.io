import request from 'supertest'
import app from '../../app'
import dbConnection from '../../db/connection'

beforeAll(() => {
  return dbConnection()
})

afterAll(() => {
  return dbConnection().then(db => db.connection.close())
})

describe('create new user', () => {
  test('Create new user fail due to invalid input', done => {
    request(app)
      .post('/api/v1/users/signup')
      .send({ name: 'test', email: 'test', password: 'test' })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(400)
        return done()
      })
  })
})
