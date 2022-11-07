/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { slideApi } from '../../api'
import useAuth from '../../hooks/useAuth'

type ICommonUploadFileProps = {
  uploadedFile: any
  setUploadedFile: any
  hiddenFileInput: any
}

const CommonUploadFile = ({
  uploadedFile,
  setUploadedFile,
  hiddenFileInput
}: ICommonUploadFileProps) => {
  const { dispatch } = useAuth()

  const handleUpload = async (uploadedFile: File) => {
    try {
      const form = new FormData()
      form.append('File', uploadedFile)

      //TODO remove password from the returned object
      const uploadedSlide = await slideApi.uploadSlide(form)
      const slides = uploadedSlide.data.slide.slides
      const lastSlide = slides[slides.length - 1]

      dispatch({ type: 'ADD_SLIDE', payload: { slide: lastSlide } })
      toast.success('Presentation uploaded successfully.')
    } catch (error) {
      toast.error('Something went wrong.')
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (uploadedFile) {
          await handleUpload(uploadedFile)
        }
      } catch (error) {
        toast.error('Failed')
      }
    })()
  }, [uploadedFile])

  const handleChange = (event: { target: unknown }) => {
    const uploadEvent = event?.target as { files: File[] }

    const fileUploaded = uploadEvent.files[0]

    if (fileUploaded.name.split('.')[1] !== 'md') {
      toast.error('Invalid File Type')
      return
    }

    if (fileUploaded) {
      setUploadedFile(fileUploaded)
    }
  }

  return (
    <div>
      <input
        ref={hiddenFileInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        type="file"
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default CommonUploadFile
