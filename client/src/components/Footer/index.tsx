import './styles.css'
import { ReactComponent as Github } from '../../assets/LandingInfoPngs/github.svg'

const Footer = () => {
  return (
    <div className="w-full flex flex-col max-w-screen-xl">
      <div className="flex lg:mb-20 lg:mt-5 lg:mr-0 lg:ml-0 justify-center align-middle">
        <div className="flex lg:flex-row lg:flex-1 lg:justify-around lg:items-start flex-col justify-center items-center lg:mr-4 lg:ml-4 mt-12 lg:mb-0 mb-12 gap-1">
          <div className="lg:pl-2 lg:max-w-xs lg:mr-2 flex-start text-center">
            <p className="text-regular text-dark mb-4 text-blue-dark font-semibold">
              Services
            </p>
            <ul className="text-grey text-footer leading-6 font-light cursor-pointer hover:text-blue-dark">
              <li className="mb-2">
                <a>Making slides</a>
              </li>
              <li className="mb-2">
                <a className="cursor-pointer">Live presentations</a>
              </li>
            </ul>
          </div>
          <div className="min-w-fit lg:pr-2 lg:max-w-xs lg:ml-10 lg:m-0 text-center">
            <p className="text-regular text-dark mb-4 text-blue-dark font-semibold">
              Team
            </p>
            <ul className="text-grey text-footer leading-6 font-light cursor-pointer hover:text-blue-dark">
              <li className="mb-2">
                <a href="https://github.com/AhmedSafi97">Ahmed Safi</a>
              </li>
              <li className="mb-2">
                <a href="https://github.com/fadezak100">Fadi Zaqout</a>
              </li>
              <li className="mb-2">
                <a href="https://github.com/Zayan-Alaraishy">Zayan Alaraishy</a>
              </li>
              <li className="mb-2">
                <a href="https://github.com/nadasuhailAyesh12">Nada Ayesh</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col lg:max-w-xs justify-center items-center">
            <p className="text-regular text-dark mb-4 text-blue-dark font-semibold">
              Follow us
            </p>
            <a href="https://github.com/CA-G12/mern-presently.io">
              <Github />
            </a>
          </div>
        </div>
      </div>
      <hr className="border-grey border-1 border-t-blue-dark" />
      <div className="mt-4 self-center text-xsmall text-grey-default font-light">
        © 2022 presently.
      </div>
    </div>
  )
}

export default Footer
