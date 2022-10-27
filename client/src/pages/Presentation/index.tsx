import './styles.css'
import { Navbar, PresentationCard, AddPresentation } from '../../components'
import Test from '../../components/test'

const Presentations = () => {
  return (
    <div>
      <Test />
      <div className="relative lg:min-h-80 lg:pr-32 lg:py-5 lg:pl-32 min-w-fit flex flex-col justify-center p-4">
        <Navbar isSinged={true} />
      </div>
      <div className="relative lg:min-h-80 lg:pr-32 lg:py-5 lg:pl-32 mb-0 min-w-fit flex flex-col justify-center">
        <div className="self-middle flex lg:justify-start justify-center">
          <p className="text-small font-semiBold mt-10 mb-10 aline-center">
            All Presentations
          </p>
        </div>

        <div className="flex gap-7 gap-y-4 flex-wrap p-2 pl-0 pr-0 lg:justify-start lg:items-start justify-center items-center">
          <PresentationCard newId="1" type="uploaded" />
          <PresentationCard newId="2" type="uploaded" />
          <PresentationCard newId="3" type="uploaded" />
          <PresentationCard newId="4" type="uploading" />
          <AddPresentation />
        </div>
      </div>
    </div>
  )
}

export default Presentations
