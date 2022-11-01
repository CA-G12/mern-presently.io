/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { slideApi } from '../../api'

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
  const handleUpload = async (uploadedFile: File) => {
    try {
      const form = new FormData()
      form.append('File', uploadedFile)
      await slideApi.uploadSlide(form)

      toast('Uploaded')
    } catch (error) {
      console.log(error)
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
    if (fileUploaded.type !== 'text/markdown') {
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
      <ToastContainer position="bottom-right" />
    </div>
  )
}

export default CommonUploadFile
