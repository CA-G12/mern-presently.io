import request from 'supertest'

import app from '../../app'
import dbConnection from '../../db/connection'

beforeAll(() => {
  return dbConnection()
})

afterAll(() => {
  return dbConnection().then(db => db.connection.close())
})

describe('Verify token controller tests', () => {
  test('Invalid token test', done => {
    request(app)
      .post('/auth/token')
      .send({
        token:
          '.eyJpZCI6IjF0ZXN0IiwiaWF0IjoxNjY1OTE5NzgxfQ.8lkF8X1CDuK6btfTB9JZf7L7CDVOhpZUNY1PP0b15aU'
      })
      .end((err, res) => {
        if (err) return done()
        expect(res.status).toBe(401)
        return done()
      })
  })

  test('Valid token test', done => {
    request(app)
      .post('/auth/token')
      .send({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjF0ZXN0IiwiaWF0IjoxNjY1OTE5NzgxfQ.8lkF8X1CDuK6btfTB9JZf7L7CDVOhpZUNY1PP0b15aU'
      })
      .end((err, res) => {
        if (err) return done()
        expect(res.status).toBe(200)
        return done()
      })
  })
})
