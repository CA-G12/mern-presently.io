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

describe('Updating presentation tests', () => {
  test('Updating a presentation with a valid id', done => {
    request(app)
      .put('/api/v1/slides/6354e09c8db6d713dc246b95')
      .send({
        title: 'Test change title',
        link: 'https://eslint.org/',
        isLive: false,
        isPrivate: true
      })
      .end((err, res) => {
        if (err) return done()
        expect(res.status).toBe(200)
        expect(res.body.message).toBe('success')
        expect(res.body.slide.title).toBe('Test change title')
        return done()
      })
  })

  test('Updating a presentation with an invalid id', done => {
    request(app).put('/api/v1/slides/63504041bbc0c96a25b05768').send({
      title: 'Linked list',
      link: 'https://hackmd/abd/linkedlist.hackmd',
      isLive: false,
      isPrivate: false
    })

    test('Updating a presentation with invalid argument type: is Live must be boolean', done => {
      request(app).put('/api/v1/slides/63504041bbc0c96a25b05765').send({
        title: 300,
        link: 'https://hackmd/abd/datastructure.hackmd',
        isLive: 'string',
        isPrivate: true
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
  })
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
