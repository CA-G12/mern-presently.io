/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useReducer } from 'react'
import { CLOSING } from 'ws'
import { SlideInterface } from './interfaces/SlideInterface'
import { UserInterface } from './interfaces/UserInterface'

export type Action =
  | { type: 'LOGIN'; payload: { user: UserInterface } }
  | {
      type: 'INITIALIZE'
      payload: { user: UserInterface | null; loggedIn: boolean }
    }
  | { type: 'ADD_SLIDE'; payload: { slide: SlideInterface } }
  | { type: 'DELETE_SLIDE'; payload: { slideID: string } }
  | { type: 'LOGOUT' }

type State = {
  auth: {
    loggedIn: boolean
    checkedToken: boolean
    user: UserInterface | null
  }
  dispatch?: React.Dispatch<Action>
}

const INITIAL_STATE = {
  auth: { loggedIn: false, checkedToken: false, user: null }
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'INITIALIZE': {
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
    case 'ADD_SLIDE': {
      const { slide } = action.payload
      const user = state.auth.user

      if (!user) {
        return state
      }

      const slides = user.slides

      return {
        ...state,
        auth: {
          ...state.auth,
          user: {
            ...user,
            slides: [...slides, slide]
          }
        }
      }
    }
    case 'DELETE_SLIDE': {
      const { slideID } = action.payload

      const user = state.auth.user

      if (!user) {
        return state
      }

      const { slides } = user

      const newSlides = slides.filter(el => el._id != slideID)

      return {
        ...state,
        user: {
          ...user,
          slides: [...newSlides]
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
