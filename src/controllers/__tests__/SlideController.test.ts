import { join } from 'path'

import request from 'supertest'

import app from '../../app'
import dbConnection from '../../db/connection'
import seed from '../../db/seeders/SeedDB'
import AuthHelper from '../../helpers/AuthHelper'

beforeAll(() => {
  return dbConnection().then(() => seed())
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

describe('Upload a new presentation to a user', () => {
  test('Upload a new presentation without authorization', done => {
    request(app)
      .post('/api/v1/slides/upload')
      .end((error, res) => {
        if (error) return done()
        expect(res.status).toBe(401)
        return done()
      })
  })

  test('Upload a new presentation with authorization', done => {
    AuthHelper.generateAccessToken('8977f708ed0c57054008e400').then(token => {
      request(app)
        .post('/api/v1/slides/upload')
        .attach(
          'file',
          join(__dirname, '..', '..', '..', 'assets', 'TestMDFile.md')
        )
        .set('Cookie', [`token=${token}`])
        .end((error, res) => {
          if (error) return done()
          expect(res.status).toBe(200)
          return done()
        })
    })
  })

  test('Upload a new presentation without attaching a file', done => {
    AuthHelper.generateAccessToken('8977f708ed0c57054008e400').then(token => {
      request(app)
        .post('/api/v1/slides/upload')
        .set('Cookie', [`token=${token}`])
        .end((error, res) => {
          if (error) return done()
          expect(res.status).toBe(400)
          return done()
        })
    })
  })
})
