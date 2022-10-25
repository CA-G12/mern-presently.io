import request from 'supertest'

import app from '../../app'
import dbConnection from '../../db/connection'
import seed from '../../db/seeders/SeedDB'

beforeAll(() => {
  return dbConnection()
    .then(() => seed())
    .then(res => console.log(res))
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
  test('Add invalid presentation with missing required inputs', done => {
    request(app)
      .post('/api/v1/slides')
      .send({ link: 'https://google.com/' })
      .end((err, res) => {
        if (err) return done()
        expect(res.status).toBe(400)
        return done()
      })
  })
  test('Add invalid presentation title', done => {
    request(app)
      .post('/api/v1/slides')
      .send({ title: 'ts', link: 'https://google.com/' })
      .end((err, res) => {
        if (err) return done()
        expect(res.status).toBe(400)
        return done()
      })
  })
  test('Add invalid presentation url', done => {
    request(app)
      .post('/api/v1/slides')
      .send({ title: 'ts', link: 'https://google/' })
      .end((err, res) => {
        if (err) return done()
        expect(res.status).toBe(400)
        return done()
      })
  })
})
