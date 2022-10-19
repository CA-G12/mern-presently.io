import request from 'supertest'

import app from '../../app'
import dbConnection from '../../db/connection'

beforeAll(() => {
  return dbConnection()
})

afterAll(() => {
  return dbConnection().then(db => db.connection.close())
})

describe('Add a new presentation', () => {
  test('Add a valid presentation', done => {
    request(app)
      .post('/api/v1/slides')
      .send({ title: 'new test presentation', link: 'https://google.com/' })
      .end((err, res) => {
        if (err) return done()
        expect(res.status).toBe(200)
        return done()
      })
  })
  test('Add invalid presentation', done => {
    request(app)
      .post('/api/v1/slides')
      .send({ link: 'https://google.com/' })
      .end((err, res) => {
        if (err) return done()
        expect(res.status).toBe(400)
        return done()
      })
  })
})
