import AuthHelper from '../AuthHelper'

describe('test auth helpers', () => {
  it('verifyAccessToken function', async () => {
    const result = await AuthHelper.verifyToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjF0ZXN0IiwiaWF0IjoxNjY1OTE5NzgxfQ.8lkF8X1CDuK6btfTB9JZf7L7CDVOhpZUNY1PP0b15aU'
    )
    expect(result.id).toBe('1test')
  })
  it('generateAccessToken function', async () => {
    const result = await AuthHelper.generateAccessToken('1test')
    const verify = await AuthHelper.verifyToken(result)
    expect(verify.id).toBe('1test')
  })

  it('signToken function', async () => {
    const result = await AuthHelper.signToken({ id: '1test' })
    const verify = await AuthHelper.verifyToken(result)
    expect(verify.id).toBe('1test')
  })
})
