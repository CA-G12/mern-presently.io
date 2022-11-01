import { useState, useRef } from 'react'
import { ReactComponent as NewPresentation } from '../../assets/PresentationIcons/addPresentation.svg'
import { CommonUploadFile } from '../../components'

const AddPresentation = () => {
  const [uploadedFile, setUploadedFile] = useState<File>()
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    const current = hiddenFileInput?.current as HTMLInputElement

    current?.click?.()
  }

  return (
    <div>
      <div className="w-72 h-20 flex justify-center items-center bg-grey-background rounded-1">
        <CommonUploadFile
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
          hiddenFileInput={hiddenFileInput}
        />
        <button className="bg-red" onClick={handleClick}>
          <NewPresentation />
        </button>
      </div>
    </div>
  )
}

export default AddPresentation
