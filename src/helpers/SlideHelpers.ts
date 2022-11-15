import { join } from 'path'

import cloudinary from 'cloudinary'
import axios from 'axios'

import cloudinaryConfig from '../config/cloudinary'
import rebrandlyConfig from '../config/rebrandly'

cloudinary.v2.config(cloudinaryConfig)

const uploadFile = async (): Promise<string> =>
  new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      join(__dirname, '..', '..', 'assets', 'latestSlides.md'),
      { upload_preset: 'ml_default', resource_type: 'auto' },
      (error: Error | undefined, uploadFile: unknown) => {
        if (error) {
          reject(error)
        } else {
          const uploadedFile = uploadFile as { secure_url: string }

          const { secure_url } = uploadedFile
          resolve(secure_url)
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
  try {
    const apiResponse = await axios(apiCall)
    console.log(apiResponse.data.shortUrl)
    return apiResponse.data.shortUrl
  } catch (error) {
    return link
  }
}

export default { uploadFile, shortenLink }
