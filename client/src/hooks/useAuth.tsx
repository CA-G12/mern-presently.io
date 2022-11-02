import { useContext } from 'react'
import { Context } from '../context'

const useAuth = () => {
  const context = useContext(Context)
  return {
    auth: context.auth,
    dispatch: context.dispatch
  }
}
export default useAuth
