import { useForm } from 'react-hook-form'

type FormData = {
  email: RegExp
  password: RegExp
}
export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = handleSubmit(data => {
    console.log('submit')
  })

  return (
    <div className="min-h-screen flex justify-center items-center	">
      <div className="flex flex-col items-center justify-center min-h-full py-7 px-10 shadow-lg w-max h-max rounded-1">
        <div>
          <h1 className="font-bold text-small">Sign in</h1>
        </div>
        <form
          className="mt-8 flex flex-col items-center justify-center ring-inset"
          onSubmit={onSubmit}
          noValidate
          autoComplete="off"
        >
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
          <div>
            <label className="relative cursor-pointer">
              <input
                type="password"
                className=" input-border py-2 px-6 rounded-1 w-96 border-2 border-grey-light border-opacity-50 placeholder-grey-light placeholder-opacity-0 outline-none focus:border-primary-default transition duration-200"
                placeholder="Password"
                {...register('password', {
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'Not a valid passsword.'
                  },
                  required: 'Password is required'
                })}
              />
              <p className="text-danger mx-1 text-footer">
                {errors.password?.message}
              </p>
              <span className="placeholder-text px-1 bg-white text-grey-light absolute left-0 top-0 mx-6 transition duration-200">
                Password
              </span>
            </label>
          </div>
          <p className="underline text-blue-bright self-end cursor-pointer my-3">
            Forget password?
          </p>
          <div className="w-full bg-primary-default text-center py-2 text-white rounded-1">
            <button type="submit">Sign in</button>
          </div>
          <p className="cursor-pointer my-3">
            Don&apos;t have an account?
            <span className="text-blue-bright underline ml-1">Sign up</span>
          </p>
        </form>
      </div>
    </div>
  )
}
