import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

import { authenticate } from '../../api/auth'
import './styles.css'
import useAuth from '../../hooks/useAuth'
import { ReactComponent as EyeVisible } from '../../assets/FormIcons/eyeVisible.svg'
import { ReactComponent as EyeInvisible } from '../../assets/FormIcons/eyeInvisible.svg'

type FormData = {
  email: string
  password: string
}

interface ILoginProps {
  setModal: () => void
  setIsOpen: (arg: boolean) => void
  isOpen: boolean
}

export default function Login({ setModal, setIsOpen, isOpen }: ILoginProps) {
  const { dispatch } = useAuth()
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState('')
  const [eyeOpen, setEyeOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const togglePassword = () => {
    setEyeOpen(!eyeOpen)
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', onClickOutSide)
    }

    return () => {
      document.removeEventListener('mousedown', onClickOutSide)
    }
  }, [])

  const onClickOutSide = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  const removeloginError = () => {
    setLoginError('')
  }

  const onSubmit = handleSubmit(async data => {
    try {
      const res = await authenticate(data)
      const { user, token } = res.data
      localStorage.setItem('token', token)

      dispatch({ type: 'LOGIN', payload: { user } })
      navigate('/presentations')
    } catch (error) {
      const exception = error as AxiosError

      if (exception.response) {
        if (exception.response.status === 400) {
          setLoginError('Please double check your credentials.')
        } else {
          setLoginError('Something went wrong.')
        }
      } else {
        setLoginError('Something went wrong.')
      }
    }
  })

  return (
    <div className="min-h-screen flex justify-center items-center	">
      <div
        ref={modalRef}
        className="box relative bg-white overflow-hidden rounded-1 shadow-lg"
      >
        <form
          className="flex flex-col items-center justify-center shadow-lg rounded-1 bg-white inset-1 p-8"
          onSubmit={onSubmit}
          noValidate
          autoComplete="off"
        >
          <div>
            <h1 className="mb-8 font-bold text-small">Sign in</h1>
          </div>
          <div className="w-full  relative">
            <label className="relative cursor-pointer ">
              <input
                className="input-border w-full py-2 px-6 rounded-1 border-2 border-grey-light placeholder-grey-light placeholder-opacity-0 border-opacity-50 outline-none focus:border-primary-default transition duration-200"
                placeholder="Email"
                {...register('email', {
                  onChange: () => removeloginError(),
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: 'Not a valid email'
                  },
                  required: 'Email Address is required'
                })}
              />
              <span className="placeholder-text px-1 bg-white text-grey-light absolute left-0 top-0 mx-6 transition duration-200">
                Email
              </span>
            </label>
            <p className="text-danger mb-5 mx-1 text-footer">
              {errors.email?.message}
            </p>
          </div>
          <div className="w-full relative">
            <label className="relative cursor-pointer">
              <input
                type={eyeOpen === false ? 'password' : 'text'}
                className="input-border w-full py-2 px-6 rounded-1 border-2 border-grey-light placeholder-grey-light placeholder-opacity-0 border-opacity-50 outline-none focus:border-primary-default transition duration-200"
                placeholder="Password"
                {...register('password', {
                  onChange: () => removeloginError(),
                  required: 'Password is required'
                })}
              />
              <span className="placeholder-text px-1 bg-white text-grey-light absolute left-0 top-0 mx-6 transition duration-200">
                Password
              </span>
              <div className="text-2xl absolute top-0 right-5">
                {eyeOpen === false ? (
                  <div onClick={togglePassword}>
                    <EyeVisible />
                  </div>
                ) : (
                  <div onClick={togglePassword}>
                    <EyeInvisible />
                  </div>
                )}
              </div>
            </label>
            <p className="text-danger mx-1 text-footer">
              {errors.password?.message}
            </p>
          </div>
          <p className="underline text-blue-bright self-end cursor-pointer my-3 text-footer">
            Forget password?
          </p>
          <button
            type="submit"
            className="w-full bg-primary-default text-center py-2 text-white rounded-1"
          >
            Sign In
          </button>

          {loginError && (
            <p className="text-danger my-3 self-start text-footer">
              {loginError}
            </p>
          )}
          <p className="cursor-pointer my-3 text-footer">
            Don&apos;t have an account ?
            <span
              className="text-blue-bright underline ml-1"
              onClick={setModal}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}
