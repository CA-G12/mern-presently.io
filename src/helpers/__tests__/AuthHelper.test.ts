import AuthHelper from '../AuthHelper'

describe('test auth helpers', () => {
  it('verifyAccessToken function with valid token', async () => {
    const newToken = await AuthHelper.generateAccessToken('newtoken')
    const result = await AuthHelper.verifyToken(newToken)
    expect(result.id).toBe('newtoken')
  })
  test('Check password: bcrypt', async () => {
    try {
      const result = await AuthHelper.checkPassword(
        'Zayan@123',
        '$2a$10$aO0IxZabCBVVd5InfPiZ9uVbliaRltJhB.RysEqqQb1rwnBldDeDK'
      )
      expect(result).toBe(true)
    } catch (e) {
      expect(e).toMatch('error')
    }
  })
})
