import environment from '../config/environment'

const cors = {
  origin: environment.client.origin,
  credentials: true // access-control-allow-credentials:true
}

export default cors
