import { ReactComponent as NewPresentation } from '../../assets/PresentationIcons/addPresentation.svg'

const AddPresentation = () => {
  return (
    <div className="w-72 h-20 flex justify-center items-center bg-grey-background rounded-1">
      <a className="cursor-pointer text-black">
        <NewPresentation />
      </a>
    </div>
  )
}

export default AddPresentation
