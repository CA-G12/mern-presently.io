import { useState, useRef } from 'react'
import Modal from 'react-modal'
import { CommonUploadFile, Login, Signup } from '../../components'
import logo from '../../assets/Logo/About.png'
import './styles.css'
import useAuth from '../../hooks/useAuth'
import { authApi } from '../../api'

const customStyles = {
  content: {
    inset: 'auto',
    background: 'transparent',
    border: 'none'
  }
}

interface INavbarProps {
  isSinged: boolean
}

const Navbar = ({ isSinged }: INavbarProps) => {
  const { dispatch } = useAuth()
  const [uploadedFile, setUploadedFile] = useState<File>()

  const [isOpen, setIsOpen] = useState(false)
  const [modal, setModal] = useState('login')

  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const ModalContent =
    modal === 'login' ? (
      <Login
        setModal={() => setModal('signup')}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
    ) : (
      <Signup
        setModal={() => setModal('login')}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
    )

  const handleClick = () => {
    if (isSinged) {
      const current = hiddenFileInput?.current as HTMLInputElement
      current?.click?.()
    } else {
      setModal('login')
      setIsOpen(true)
    }
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
            <a
              onClick={async () => {
                await authApi.logout()
                dispatch({ type: 'LOGOUT' })
              }}
              className="lg:mr-10 text-grey-default  font-medium hover:text-blue-dark cursor-pointer"
            >
              Logout
            </a>
          </div>
        ) : (
          <a
            onClick={() => {
              setIsOpen(true)
              setModal('login')
            }}
            className="lg:mr-10 text-grey-default font-medium hover:text-blue-dark cursor-pointer"
          >
            Sign in
          </a>
        )}
      </div>
      <Modal
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        shouldCloseOnEsc={true}
        className="Modal"
      >
        {ModalContent}
      </Modal>
    </div>
  )
}

export default Navbar
