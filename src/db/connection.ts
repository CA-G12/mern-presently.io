import mongoose from 'mongoose'
import environment from '../config/environment'

const dbConnection = () => mongoose.connect(environment.database.uri)

export default dbConnection
