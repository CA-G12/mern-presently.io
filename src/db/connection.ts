import mongoose from 'mongoose'
import environment from '../config/environment'
console.log({ what: environment.database.uri })
const dbConnection = () => mongoose.connect(environment.database.uri)

export default dbConnection
