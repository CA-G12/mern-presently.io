const config = {
  apiBaseUrl:
    process.env.REACT_APP_API_URL || 'https://presently.onrender.com//api/v1',
  wsBaseUrl: process.env.REACT_APP_WS_URL || 'https://presently.onrender.com/'
}

export default config
