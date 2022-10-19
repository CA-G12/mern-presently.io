export default class CustomError extends Error {
  constructor(message: string) {
    super(message)
    this.message = message
    this.name = 'handeld'
  }
}
