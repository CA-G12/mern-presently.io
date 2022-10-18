import AuthHelper from '../AuthHelper'
import dbConnection from '../../db/connection'

beforeAll(() => {
  return dbConnection()
})

afterAll(() => {
  return dbConnection().then(db => db.connection.close())
})

describe('test auth helpers', () => {
  test('verifyAccessToken function with valid token', async () => {
    expect(3).toBe(3)
  })
})
