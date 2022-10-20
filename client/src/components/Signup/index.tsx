import { useState } from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { AxiosError } from 'axios'
import { authApi } from '../../api'
import { UserInterface } from '../../interfaces/UserInterface'

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false)
  const [signupError, setSignupError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (async (data: UserInterface) => {
    try {
      setSubmitting(true)
      await authApi.handleSignup(data)
      setSubmitting(false)
      // TODO: what comes after signup?
    } catch (error) {
      const exception = error as AxiosError
      if (exception.request) {
        setSignupError('Something went wrong')
      } else {
        if (exception.response?.status === 400) {
          setSignupError('email is already exist ')
        } else {
          setSignupError('server error ')
        }
      }
    }
  }) as SubmitHandler<FieldValues>

  return (
    <body className="min-h-screen flex items-center justify-center ">
      <form
        className="w-6/12 h-screen flex flex-col items-center justify-around shadow-[0_0_15px_0_rgba(0,0,0,0.2)] pt-15	
     pr-30 pb-15  pl-30 rounded-[10px] max-w-[598px] max-h-[705px] "
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className="text-3xl font-bold text-gray-900">Sign Up</span>
        <input
          type="text"
          className="rounded-[10px]  w-[85%] max-w-[440px] h-[44px] border-[##2b2e30] border outline"
          placeholder=" YourUsername"
          {...register('name', {
            required: true
          })}
        />
        <p className="text-danger mx-1 text-footer">
          {`${errors.password?.message}`}
        </p>
        <input
          type="text"
          className="rounded-[10px]  w-[85%] max-w-[440px] h-[44px] border-[##2b2e30] border outline"
          placeholder=" YourEmail"
          {...register('email', {
            required: {
              value: true,
              message: 'Please input your email'
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'invalid email'
            }
          })}
        />
        <p className="text-danger mx-1 text-footer">{`${errors.email?.message}`}</p>
        <input
          type="text"
          className="rounded-[10px]  w-[85%] max-w-[440px] h-[44px] border-[#CDCDCD] border outline"
          placeholder=" yourPassword"
          {...register('password', {
            required: {
              value: true,
              message: 'Please input your password'
            },
            maxLength: {
              value: 26,
              message: 'the maximum length is 26'
            },
            minLength: {
              value: 6,
              message: 'the minimum length is 6'
            }
          })}
        />
        <p className="text-danger mx-1 text-footer">
          {`${errors.password?.message}`}
        </p>
        <span className="text-gray-900 font-normal text-sm">
          By clicking below, you agree to our terms of service.
        </span>
        <button
          className="w-4/5 h-12 bg-blue-500 text-white text-base font-normal max-w-[400px] rounded-[10px] border-none outline-none "
          type="submit"
        >
          Sign Up
        </button>
        <div className="w-4/5 h-3 flex items-center justify-between max-w-[400px]">
          <div className="w-2/5 h-px bg-black" />
          <span className="or">or</span>
          <div className="w-2/5 h-px bg-black" />
        </div>
        <div className="w-4/5 h-12 bg-indigo-100 flex items-center justify-center text-black  max-w-[400px] border-none rounded-[10px] ">
          <svg
            width={40}
            height={25}
            viewBox="0 0 40 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg "
            className="mr-4"
          >
            <path
              d="M22.207 10.7094C23.4215 10.7094 24.5055 11.5753 24.5055 12.7898C24.5055 19.9352 19.7135 25 12.5 25C5.59349 25 0 19.4066 0 12.5C0 5.59342 5.59349 0 12.5 0C14.9459 0 17.0965 0.644248 18.9258 1.77722C20.0627 2.4813 20.0629 4.05183 19.0982 4.9778C18.1941 5.84554 16.7728 5.79877 15.6363 5.27073C14.7977 4.88108 13.7577 4.60436 12.5 4.60436C8.23672 4.60436 4.75781 8.13437 4.75781 12.5C4.75781 16.8656 8.23672 20.3956 12.5 20.3956C15.0045 20.3956 16.7174 19.4815 17.8358 18.3421C19.243 16.9086 17.7759 15.0068 15.7671 15.0068H14.6487C13.462 15.0068 12.5 14.0448 12.5 12.858C12.5 11.6713 13.462 10.7093 14.6487 10.7093L22.207 10.7094ZM38.1858 11.1285C37.1838 11.1285 36.3715 10.3162 36.3715 9.31423C36.3715 8.31226 35.5506 7.5 34.5486 7.5C33.5466 7.5 32.7257 8.31226 32.7257 9.31423C32.7257 10.3162 31.9134 11.1285 30.9114 11.1285C29.9095 11.1285 29.0972 11.9494 29.0972 12.9514C29.0972 13.9534 29.9095 14.7743 30.9114 14.7743C31.9134 14.7743 32.7257 15.5866 32.7257 16.5886C32.7257 17.5905 33.5466 18.4028 34.5486 18.4028C35.5506 18.4028 36.3715 17.5905 36.3715 16.5886C36.3715 15.5866 37.1838 14.7743 38.1858 14.7743C39.1877 14.7743 40 13.9534 40 12.9514C40 11.9494 39.1877 11.1285 38.1858 11.1285Z"
              fill="black"
            />
          </svg>
          <span>sign up with google</span>
        </div>
        <div className=" w-4/5 h-12 bg-indigo-100 flex items-center justify-center text-black  max-w-[400px] border-none rounded-[10px] ">
          <svg
            width={29}
            height={26}
            viewBox="0 0 29 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg ml-4 "
            className="mr-4"
          >
            <path
              d="M9.6998 20.9349C9.6998 21.0424 9.56532 21.1285 9.39577 21.1285C9.20282 21.1446 9.06835 21.0586 9.06835 20.9349C9.06835 20.8274 9.20282 20.7414 9.37238 20.7414C9.54778 20.7252 9.6998 20.8113 9.6998 20.9349ZM7.88145 20.693C7.84052 20.8005 7.95746 20.9242 8.13286 20.9564C8.28488 21.0102 8.46028 20.9564 8.49536 20.8489C8.53044 20.7414 8.41935 20.6177 8.24395 20.5693C8.09194 20.5317 7.92238 20.5855 7.88145 20.693ZM10.4657 20.6016C10.2962 20.6392 10.1792 20.7414 10.1968 20.865C10.2143 20.9726 10.3663 21.0424 10.5417 21.0048C10.7113 20.9672 10.8282 20.865 10.8107 20.7575C10.7931 20.6554 10.6353 20.5855 10.4657 20.6016ZM14.3129 -0.000244141C6.20343 -0.000244141 0 5.66096 0 13.1178C0 19.0801 4.08105 24.1822 9.91028 25.9778C10.6587 26.1015 10.9218 25.6768 10.9218 25.3273C10.9218 24.994 10.9042 23.1553 10.9042 22.0263C10.9042 22.0263 6.81149 22.8327 5.95202 20.4242C5.95202 20.4242 5.28548 18.8597 4.32661 18.4565C4.32661 18.4565 2.9877 17.6124 4.42016 17.6285C4.42016 17.6285 5.87601 17.736 6.67702 19.0156C7.95746 21.0908 10.1032 20.4941 10.9393 20.1392C11.0738 19.279 11.4538 18.6823 11.8748 18.3274C8.60645 17.9941 5.30887 17.5586 5.30887 12.3867C5.30887 10.9082 5.75323 10.1663 6.68871 9.22004C6.53669 8.87059 6.03972 7.42975 6.84073 5.56956C8.0627 5.22011 10.875 7.02115 10.875 7.02115C12.0444 6.72008 13.3014 6.56417 14.5468 6.56417C15.7921 6.56417 17.0492 6.72008 18.2185 7.02115C18.2185 7.02115 21.0308 5.21473 22.2528 5.56956C23.0538 7.43512 22.5569 8.87059 22.4048 9.22004C23.3403 10.1716 23.9133 10.9136 23.9133 12.3867C23.9133 17.5748 20.4696 17.9887 17.2012 18.3274C17.7391 18.7522 18.1952 19.5586 18.1952 20.822C18.1952 22.6338 18.1776 24.8757 18.1776 25.3166C18.1776 25.666 18.4466 26.0908 19.1891 25.9671C25.0359 24.1822 29 19.0801 29 13.1178C29 5.66096 22.4224 -0.000244141 14.3129 -0.000244141ZM5.68306 18.5425C5.60706 18.5962 5.6246 18.7199 5.72399 18.822C5.81754 18.9081 5.95202 18.9457 6.02802 18.8758C6.10403 18.822 6.08649 18.6984 5.9871 18.5962C5.89355 18.5102 5.75907 18.4726 5.68306 18.5425ZM5.05161 18.107C5.01069 18.1769 5.06915 18.2629 5.18609 18.3167C5.27964 18.3704 5.39657 18.3543 5.4375 18.279C5.47843 18.2092 5.41996 18.1231 5.30302 18.0694C5.18609 18.0371 5.09254 18.0532 5.05161 18.107ZM6.94597 20.021C6.85242 20.0908 6.8875 20.2521 7.02198 20.3543C7.15645 20.4779 7.32601 20.4941 7.40202 20.408C7.47802 20.3382 7.44294 20.1769 7.32601 20.0747C7.19738 19.9511 7.02198 19.9349 6.94597 20.021ZM6.27944 19.2306C6.18589 19.2844 6.18589 19.4242 6.27944 19.5478C6.37298 19.6715 6.53085 19.7253 6.60685 19.6715C6.7004 19.6016 6.7004 19.4618 6.60685 19.3382C6.525 19.2145 6.37298 19.1608 6.27944 19.2306Z"
              fill="black"
            />
          </svg>
          <span>sign up with github</span>
        </div>
        <span className="text-xs text-black">
          Already Have an Account?{' '}
          <a className="no-underline text-blue-400 " href="\login">
            Login
          </a>
        </span>
        <p className="text-gray-900 font-normal text-sm">{signupError}</p>
      </form>
    </body>
  )
}

export default SignUp
