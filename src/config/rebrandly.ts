import environment from './environment'

const rebrandlyConfig = {
  'Content-Type': 'application/json',
  apikey: environment.rebrandly.apiKey
}

export default rebrandlyConfig
