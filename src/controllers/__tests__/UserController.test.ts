import dbConnection from '../../db/connection'

beforeAll(() => {
  return dbConnection()
})

test('dummy test', () => {
  expect(1).toBe(1)
})
afterAll(() => {
  return dbConnection().then(db => db.connection.close())
})
