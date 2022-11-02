import dbConnection from '../../db/connection'
import SlideHelper from '../SlideHelpers'

beforeAll(() => {
  return dbConnection()
})

afterAll(() => {
  return dbConnection().then(db => db.connection.close())
})

//shortenLink
describe('test slidesHelper', () => {
  test('Test uploadFile', async () => {
    const secureUrl = await SlideHelper.uploadFile()
    expect(secureUrl).toContain('https://res.cloudinary.com')
  })

  test('test shortenLink helper', async () => {
    const url = 'http://google.com'
    const shortenLink = await SlideHelper.shortenLink(url)
    expect(shortenLink).toContain('rebrand.ly')
  })
})
