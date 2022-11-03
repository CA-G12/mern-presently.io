import { useContext } from 'react'
import { Context, Action } from '../context'

const useAuth = () => {
  const context = useContext(Context)
  const dispatch = context.dispatch as React.Dispatch<Action>
  const auth = context.auth

  return {
    ...auth,
    dispatch
  }
}

export default useAuth
