import environment from './environment'

const cloudinaryConfig = {
  secure: true,
  cloud_name: environment.cloudinary.cloudName,
  api_key: environment.cloudinary.apiKey,
  api_secret: environment.cloudinary.apiSecret
}

export default cloudinaryConfig
