import { join } from 'path'

import cloudinary from 'cloudinary'
import axios from 'axios'

import cloudinaryConfig from '../config/cloudinary'
import rebrandlyConfig from '../config/rebrandly'

cloudinary.v2.config(cloudinaryConfig)

const uploadFile = async (): Promise<any> =>
  new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      join(__dirname, '..', '..', 'assets', 'latestSlides.md'),
      { upload_preset: 'ml_default', resource_type: 'auto' },
      (error: Error | undefined, uploadFile: unknown) => {
        if (error) {
          reject(error)
        } else {
          resolve(uploadFile)
        }
      }
    )
  })

const shortenLink = async (link: string): Promise<string> => {
  const headers = rebrandlyConfig
  const endpoint = 'https://api.rebrandly.com/v1/links'
  const linkRequest = {
    destination: link,
    domain: { fullName: 'rebrand.ly' }
  }
  const apiCall = {
    method: 'post',
    url: endpoint,
    data: linkRequest,
    headers: headers
  }
  const apiResponse = await axios(apiCall)
  return apiResponse.data.shortUrl
}

export default { uploadFile, shortenLink }
