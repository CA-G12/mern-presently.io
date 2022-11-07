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

describe('Updating presentation tests', () => {
  test('Test unauthorized', done => {
    request(app)
      .put('/api/v1/slides/123ea40720dcfa02e0ae42db')
      .send({
        title: 'Linked list',
        link: 'https://www.geeksforgeeks.org/data-structures/linked-list/',
        isLive: false,
        isPrivate: false
      })
      .end((err, res) => {
        if (err) return done()
        expect(res.status).toBe(401)
        return done()
      })
  })

  test('Updating a presentation with a valid id', done => {
    AuthHelper.generateAccessToken('6357f708ed0c57054008e300').then(jwt => {
      request(app)
        .put('/api/v1/slides/123ea40720dcfa02e0ae42db')
        .set('Cookie', [`token=${jwt}`])
        .send({
          title: 'Linked list',
          isLive: false,
          isPrivate: false
        })
        .end((err, res) => {
          if (err) return done()
          expect(res.status).toBe(200)
          expect(res.body.updatedUserDocument.slides[0].title).toBe(
            'Linked list'
          )
          return done()
        })
    })
  })

  test('Updating a presentation with an invalid id', done => {
    AuthHelper.generateAccessToken('6357f708ed0c57054008e300').then(jwt => {
      request(app)
        .put('/api/v1/slides/456ea40720dcfa02e0ae40db')
        .set('Cookie', [`token=${jwt}`])
        .send({
          title: 'Linked list',
          isLive: false,
          isPrivate: false
        })
        .end((err, res) => {
          if (err) return done()
          expect(res.status).toBe(400)
          expect(res.body.message).toBe('Slide not found')
          return done()
        })
    })
  })

  test('Updating a presentation with invalid argument type: is Live must be boolean', done => {
    AuthHelper.generateAccessToken('6357f708ed0c57054008e300').then(jwt => {
      request(app)
        .put('/api/v1/slides/63504041bbc0c96a25b05765')
        .set('Cookie', [`token=${jwt}`])
        .send({
          title: 'Title changed',
          isLive: 'string',
          isPrivate: true
        })
        .end((err, res) => {
          if (err) return done()
          expect(res.status).toBe(400)
          return done()
        })
    })
  })
})

describe('Add a new presentation', () => {
  test('Add a valid presentation', done => {
    AuthHelper.generateAccessToken('6357f708ed0c57054008e300').then(jwt => {
      request(app)
        .post('/api/v1/slides/')
        .set('Cookie', [`token=${jwt}`])
        .attach(
          'File',
          join(__dirname, '..', '..', '..', 'assets', 'latestSlides.md')
        )
        .end((err, res) => {
          if (err) return done()
          expect(res.status).toBe(200)
          return done()
        })
    })
  })

  test('Upload a new presentation without attaching a file', done => {
    AuthHelper.generateAccessToken('6357f708ed0c57054008e300').then(token => {
      request(app)
        .post('/api/v1/slides/')
        .set('Cookie', [`token=${token}`])
        .attach(
          'File',
          join(__dirname, '..', '..', '..', 'assets', 'TestMDFile.md')
        )
        .end((error, res) => {
          if (error) return done()
          expect(res.status).toBe(400)
          return done()
        })
    })
  })

  test('Add invalid presentation title', done => {
    AuthHelper.generateAccessToken('6357f708ed0c57054008e300').then(jwt => {
      request(app)
        .post('/api/v1/slides')
        .set('Cookie', [`token=${jwt}`])
        .send({ title: 'ts', link: 'https://google.com/' })
        .end((err, res) => {
          if (err) return done()
          expect(res.status).toBe(400)
          return done()
        })
    })
  })

  test('Add invalid presentation url', done => {
    AuthHelper.generateAccessToken('6357f708ed0c57054008e300').then(jwt => {
      request(app)
        .post('/api/v1/slides')
        .set('Cookie', [`token=${jwt}`])
        .send({ title: 'ts', link: 'https://google/' })
        .end((err, res) => {
          if (err) return done()
          expect(res.status).toBe(400)
          return done()
        })
    })
  })

  test('Add invalid presentation with missing required inputs', done => {
    AuthHelper.generateAccessToken('6357f708ed0c57054008e300').then(jwt => {
      request(app)
        .post('/api/v1/slides')
        .set('Cookie', [`token=${jwt}`])
        .send({ link: 'https://google.com/' })
        .end((err, res) => {
          if (err) return done()
          expect(res.status).toBe(400)
          return done()
        })
    })
  })
})

describe('Getting slide by id', () => {
  test('Get info for valid slide id', done => {
    request(app)
      .get('/api/v1/slides/456ea40720dcfa02e0ae42db')
      .end((err, res) => {
        if (err) return done()
        expect(res.status).toBe(200)
        expect(res.body.slide.info.title).toBe('OAUTH')
        return done()
      })
  })

  test('Get info for invalid slide id', done => {
    request(app)
      .get('/api/v1/slides/456ea40720dcfa02e0ae40db')
      .end((err, res) => {
        if (err) return done()
        expect(res.status).toBe(400)
        expect(res.body.message).toBe('Slide not found')
        return done()
      })
  })
})
