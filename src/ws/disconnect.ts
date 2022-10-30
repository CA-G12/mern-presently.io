const disconnect = (socket: any) => async () => {
  console.log(`${socket.id} has disconnected`)
}

export default disconnect
