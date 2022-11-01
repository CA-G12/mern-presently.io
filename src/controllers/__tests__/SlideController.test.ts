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

describe('Upload a new presentation to a user', () => {
  test('Upload a new presentation without authorization', done => {
    request(app)
      .post('/api/v1/slides/')
      .end((error, res) => {
        if (error) return done()
        expect(res.status).toBe(401)
        return done()
      })
  })

  test('Upload a new presentation with authorization', done => {
    AuthHelper.generateAccessToken('8977f708ed0c57054008e400').then(token => {
      request(app)
        .post('/api/v1/slides/')
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
        .post('/api/v1/slides/')
        .set('Cookie', [`token=${token}`])
        .end((error, res) => {
          if (error) return done()
          expect(res.status).toBe(400)
          return done()
        })
    })
  })
})
