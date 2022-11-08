import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="max-h-screen flex flex-col justify-center items-center py-8">
      <img
        src={require('../../assets/404/404.png')}
        alt="404 - Page not found"
        className="w-max h-[500px] object-contain"
      />
      <p className="text-primary-default text-small text-center m-4">
        The page you are looking for could not be found
      </p>
      <button
        className="rounded-1 bg-primary-default text-white text-small px-6 py-1 hover:scale-110 duration-500"
        onClick={() => navigate('/')}
      >
        Home
      </button>
    </div>
  )
}

export default NotFound
