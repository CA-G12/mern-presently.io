import request from 'supertest'

import app from '../../app'
import dbConnection from '../../db/connection'

beforeAll(() => {
  return dbConnection()
})

afterAll(() => {
  return dbConnection().then(db => db.connection.close())
})

describe('Updating presentation tests', () => {
  test('Updating a presentation with a valid id', done => {
    request(app)
      .put('/api/v1/slides/63503d4745241d6bca02ef9c')
      .send({
        title: 'Data333',
        link: 'https://hackmd/abd/datastructure.hackmd',
        isLive: false,
        isPrivate: true
      })
      .end((err, res) => {
        if (err) return done()
        expect(res.status).toBe(200)
        expect(res.body.message).toBe('Edited Successfuly')
        expect(res.body.updatededPresentaion).toEqual({
          _id: '63503d4745241d6bca02ef9c',
          title: 'Data222',
          link: 'https://hackmd/abd/datastructure.hackmd',
          isLive: false,
          isPrivate: true,
          __v: 0
        })
        return done()
      })
  })
  //TODO: this must pass after handling generic error in PresentationService
  //   test('Updating a presentation with invalid id', done => {
  //     request(app)
  //       .put('/api/v1/slides/700')
  //       .send({
  //         title: 'Linked list',
  //         link: 'https://hackmd/abd/linkedlist.hackmd',
  //         isLive: false,
  //         isPrivate: false
  //       })
  //       .end((err, res) => {
  //         if (err) return done()
  //         expect(res.status).toBe(400)
  //         return done()
  //       })
  //   })

  //TODO: this must pass after adding server error 500 middleware
  // test('Updating a presentation with invlaid argument type: is Live must be boolean', done => {
  //   request(app)
  //     .put('/api/v1/slides/63504041bbc0c96a25b05765')
  //     .send({
  //       title: 300,
  //       link: 'https://hackmd/abd/datastructure.hackmd',
  //       isLive: 'false',
  //       isPrivate: true
  //     })
  //     .end((err, res) => {
  //       if (err) return done()
  //       expect(res.status).toBe(500)
  //       return done()
  //     })
  // })
})
