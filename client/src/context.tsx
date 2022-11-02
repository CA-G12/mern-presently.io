/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useReducer } from 'react'
import { UserInterface } from '../../src/interfaces/UserInterface'

const INITIAL_STATE = {
  auth: { loggedIn: false, checkedToken: false, user: null }
}
export type Action =
  | { type: 'LOGIN'; payload: { user: UserInterface } }
  | { type: 'INITALISE'; payload: { user: UserInterface; loggedIn: boolean } }
  | { type: 'LOGOUT' }

type State = {
  auth: {
    loggedIn: boolean
    checkedToken: boolean
    user: UserInterface | null
  }
  dispatch?: React.Dispatch<Action>
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'INITALISE': {
      const { loggedIn, user } = action.payload

      return {
        ...state,
        auth: {
          loggedIn,
          checkedToken: true,
          user
        }
      }
    }
    case 'LOGIN': {
      const { user } = action.payload

      return {
        ...state,
        auth: {
          loggedIn: true,
          checkedToken: true,
          user
        }
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        auth: {
          loggedIn: false,
          checkedToken: true,
          user: null
        }
      }
    }
  }
}
export const Context = createContext<State>(INITIAL_STATE)

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider
