import logo from '../../assets/Logo/About.png'
import './styles.css'

import { CommonUploadFile } from '../../components'
import { useState, useRef } from 'react'

interface INavbarProps {
  isSinged: boolean
}

const Navbar = ({ isSinged }: INavbarProps) => {
  const [uploadedFile, setUploadedFile] = useState<File>()
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    const current = hiddenFileInput?.current as HTMLInputElement
    current?.click?.()
  }

  return (
    <div className="flex lg:flex-row justify-between gap-2 font-sans font-regular flex-col-reverse">
      <div className="self-center flex lg:mt-0 mt-2">
        <img src={logo} />
      </div>
      <div className="flex lg:justify-center justify-between align-middle lg:text-regular text-xsmall gap-4">
        <a
          onClick={handleClick}
          className="lg:mr-20 text-grey-default font-medium hover:text-blue-dark cursor-pointer"
        >
          Upload
        </a>
        {isSinged ? (
          <div>
            <CommonUploadFile
              uploadedFile={uploadedFile}
              setUploadedFile={setUploadedFile}
              hiddenFileInput={hiddenFileInput}
            />
            <a className="lg:mr-10 text-grey-default  font-medium hover:text-blue-dark cursor-pointer">
              Logout
            </a>
          </div>
        ) : (
          <a className="lg:mr-10 text-grey-default font-medium hover:text-blue-dark cursor-pointer">
            Sign in
          </a>
        )}
      </div>
    </div>
  )
}

export default Navbar
