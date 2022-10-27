import { useState } from 'react'

import { ReactComponent as NewPresentation } from '../../assets/PresentationIcons/addPresentation.svg'
import { Upload } from '..'

const AddPresentation = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      {showModal && <Upload />}
      <div className="w-72 h-20 flex justify-center items-center bg-grey-background rounded-1">
        <a
          className="cursor-pointer text-black"
          onClick={() => setShowModal(true)}
        >
          <NewPresentation />
        </a>
      </div>
    </div>
  )
}

export default AddPresentation
