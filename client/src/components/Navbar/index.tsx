import logo from '../../assets/Logo/About.png'
import './styles.css'

interface Props {
  isSinged: boolean
}
const Navbar = ({ isSinged }: Props) => {
  return (
    <div className="flex lg:flex-row justify-between gap-2 font-sans font-regular flex-col-reverse">
      <div className="self-center flex lg:mt-0 mt-2">
        <img src={logo} />
      </div>
      <div className="flex lg:justify-center justify-between align-middle lg:text-regular text-xsmall gap-4">
        <a className="lg:mr-20 text-grey-default hover:text-grey-hover font-medium hover:text-blue-dark cursor-pointer">
          Upload
        </a>
        {isSinged ? (
          <a className="lg:mr-10 text-grey-default hover:text-grey-hover font-medium hover:text-blue-dark cursor-pointer">
            Logout
          </a>
        ) : (
          <a className="lg:mr-10 text-grey-default hover:text-grey-hover font-medium hover:text-blue-dark cursor-pointer">
            Sign in
          </a>
        )}
      </div>
    </div>
  )
}

export default Navbar
