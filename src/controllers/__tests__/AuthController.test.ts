import request from 'supertest'
import AuthHelper from '../../helpers/AuthHelper'
import app from '../../app'
import dbConnection from '../../db/connection'
import seed from '../../db/seeders/SeedDB'

beforeAll(() => {
  return dbConnection().then(() => seed())
})

afterAll(() => {
  return dbConnection().then(db => db.connection.close())
})

describe('Verify token controller tests', () => {
  test('Invalid token test', done => {
    request(app)
      .post('/api/v1/auth/token')
      .set(
        'x-access-token',
        'Bearer .eyJpZCI6IjF0ZXN0IiwiaWF0IjoxNjY1OTE5NzgxfQ.8lkF8X1CDuK6btfTB9JZf7L7CDVOhpZUNY1PP0b15aU'
      )
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(401)
        return done()
      })
  })

  test('Valid token test', done => {
    AuthHelper.generateAccessToken('6357f708ed0c57054008e300').then(jwt => {
      request(app)
        .post('/api/v1/auth/token')
        .set('x-access-token', `Bearer ${jwt}`)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.status).toBe(200)
          return done()
        })
    })
  })
})

describe('Authentication tests', () => {
  test('Validation error: password is not valid', done => {
    request(app)
      .post('/api/v1/auth/authenticate')
      .send({
        email: 'ahmed@gmail.com',
        password: '123456'
      })
      .end((err, res) => {
        if (err) return done()
        expect(res.status).toBe(400)
        return done()
      })
  })
  test('Invalid credentials: wrong password', done => {
    request(app)
      .post('/api/v1/auth/authenticate')
      .send({
        email: 'ahmed@gmail.com',
        password: 'Asd/1234'
      })
      .end((err, res) => {
        if (err) return done()
        expect(res.status).toBe(400)
        return done()
      })
  })
  test('Valid credentials', done => {
    request(app)
      .post('/api/v1/auth/authenticate')
      .send({
        email: 'ahmed@gmail.com',
        password: 'Asd@123456'
      })
      .end((err, res) => {
        if (err) return done()
        expect(res.status).toBe(200)
        return done()
      })
  })
})
