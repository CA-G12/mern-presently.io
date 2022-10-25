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
  test('Updating a presentation with an valid id', done => {
    request(app)
      .put('/api/v1/slides/123ea40720dcfa02e0ae42db')
      .set('Cookie', [
        `token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTc5MmU2YzRhMmMzMzc0MDk0MGU0MiIsImlhdCI6MTY2NjY4NjcwMn0.tDa2eRrEsde_tDYeVZR35TSsz4_n6IsLEChm9Hyif10`
      ])
      .send({
        title: 'Linked list',
        link: 'https://hackmd/abd/linkedlist.hackmd',
        isLive: false,
        isPrivate: false
      })
      .end((err, res) => {
        if (err) return done()
        expect(res.status).toBe(200)
        return done()
      })
  })
  test('Updating a presentation with an invalid id', done => {
    request(app)
      .put('/api/v1/slides/456ea40720dcfa02e0ae40db')
      .set('Cookie', [
        `token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTc5MmU2YzRhMmMzMzc0MDk0MGU0MiIsImlhdCI6MTY2NjY4NjcwMn0.tDa2eRrEsde_tDYeVZR35TSsz4_n6IsLEChm9Hyif10`
      ])
      .send({
        title: 'Linked list',
        link: 'https://hackmd/abd/linkedlist.hackmd',
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

  test('Updating a presentation with invalid argument type: is Live must be boolean', done => {
    request(app)
      .put('/api/v1/slides/63504041bbc0c96a25b05765')
      .set('Cookie', [
        `token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTc5MmU2YzRhMmMzMzc0MDk0MGU0MiIsImlhdCI6MTY2NjY4NjcwMn0.tDa2eRrEsde_tDYeVZR35TSsz4_n6IsLEChm9Hyif10`
      ])
      .send({
        title: 'Title changed',
        link: 'https://hackmd/abd/datastructure.hackmd',
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
