import AuthHelper from '../AuthHelper'

describe('test auth helpers', () => {
  it('verifyAccessToken function with valid token', async () => {
    const newToken = await AuthHelper.generateAccessToken('newtoken')
    const result = await AuthHelper.verifyToken(newToken)
    expect(result.id).toBe('newtoken')
  })
})
