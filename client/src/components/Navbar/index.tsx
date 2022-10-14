import './style.css'
import logo from '../../assets/Logo/About.png'
const Navbar = () => {
  return (
    <div className="flex justify-between gap-2 font-sans font-regular">
      <div className="flex">
        <img src={logo} />
      </div>
      <div className="flex justify-center align-middle">
        <a className="mr-20 text-grey-default hover:text-grey-hover font-semibold">
          Upload presentation
        </a>
        <a className="mr-10 text-grey-default hover:text-grey-hover font-semibold">
          Sign in
        </a>
      </div>
    </div>
  )
}

export default Navbar
