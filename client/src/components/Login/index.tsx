import { useState } from 'react'
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

export default function Login({ setModal }: { setModal: () => void }) {
  const { dispatch } = useAuth()
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState('')
  const [eyeOpen, setEyeOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const togglePassword = () => {
    setEyeOpen(!eyeOpen)
  }

  const onSubmit = handleSubmit(async data => {
    try {
      const res = await authenticate(data)
      const user = res.data.user
      dispatch({ type: 'LOGIN', payload: { user } })
      navigate('/presentations')
    } catch (error) {
      const exception = error as AxiosError

      if (exception.response) {
        if (exception.response.status === 400) {
          setLoginError('Please double check your password and email.')
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
      <div className="box relative bg-white overflow-hidden rounded-1 shadow-lg">
        <form
          className="flex flex-col items-center justify-center absolute rounded-1 bg-white inset-1 z-10 p-8"
          onSubmit={onSubmit}
          noValidate
          autoComplete="off"
        >
          <div>
            <h1 className="mb-8 font-bold text-small">Sign in</h1>
          </div>
          <div>
            <label className="relative cursor-pointer">
              <input
                className="input-border py-2 px-6 rounded-1 w-96 border-2 border-grey-light placeholder-grey-light placeholder-opacity-0 border-opacity-50 outline-none focus:border-primary-default transition duration-200"
                placeholder="Email"
                {...register('email', {
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
          <div className="w-96">
            <label className="relative cursor-pointer">
              <input
                type={eyeOpen === false ? 'password' : 'text'}
                className=" input-border py-2 px-6 rounded-1 w-96 border-2 border-grey-light border-opacity-50 placeholder-grey-light placeholder-opacity-0 outline-none focus:border-primary-default transition duration-200"
                placeholder="Password"
                {...register('password', {
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
          <p className="underline text-blue-bright self-end cursor-pointer my-3 mx-5">
            Forget password?
          </p>
          <button
            type="submit"
            className="w-96 bg-primary-default text-center py-2 text-white rounded-1"
          >
            Sign In
          </button>

          {loginError && (
            <p className="text-danger my-3 self-start ml-7">{loginError}</p>
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
