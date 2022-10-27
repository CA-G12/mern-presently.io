import environment from './environment'

const rebrandlyConfig = {
  'Content-Type': 'application/json',
  apikey: environment.readonly.apiKey
}

export default rebrandlyConfig
