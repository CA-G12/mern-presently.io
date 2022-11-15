import { useNavigate } from 'react-router-dom'

import './styles.css'
import mainImage from '../../assets/LandingInfoPngs/main.png'
import frameImage from '../../assets/LandingInfoPngs/frame.png'
import computerImage from '../../assets/LandingInfoPngs/computer.png'

type ILandingCardProps = {
  type: string
  className: string
}

const LandingCard = ({ type }: ILandingCardProps) => {
  let data = null
  const navigate = useNavigate()

  switch (type) {
    case 'first':
      data = {
        subHead: 'Present Like a Chad!',
        head: 'Best Choice for your',
        boldHeader: '',
        brushedHeader: 'live presentations',
        img: mainImage,
        styles:
          'relative self-start flex lg:flex-row flex-col justify-around lg:pt-20 lg:pb-2 pt-12 gap-16 text-blue-dark',
        description:
          '1. Upload your md presentation.\n2. Convert it into slides.\n3.Go live\n4. Get Live Feedback. \n \n \n'
      }
      break
    case 'second':
      data = {
        subHead: 'Making slides',
        boldHeader: 'Prepare your ',
        brushedHeader: 'md file',
        img: frameImage,
        styles:
          'relative self-start flex lg:flex-row lg:flex-row-reverse  flex-col justify-around lg:pt-10 pt-12 gap-24 text-blue-dark pb-20 bt-20',
        description: `-   Prepare the content of your slides in .md file. \n -   Separate your slides in the file by ---. \n -   Leave one space after each slide`
      }
      break
    case 'third':
      data = {
        subHead: 'Live presentation',
        boldHeader: 'Get your audience ',
        brushedHeader: 'comments',
        img: computerImage,
        styles:
          'relative self-start lg:flex-row flex-col flex justify-around lg:pt-10 pt-12 gap-16 pb-20 bt-20 text-blue-dark',
        description:
          'Invite your audience to check your slides and add their comments and feedback while presenting.'
      }
      break
  }

  return (
    <div className="flex flex-col relative">
      {data && (
        <div className={data.styles}>
          <div className="lg:flex flex flex-col justify-center align-middle mt-2 mr-4 lg:ml-0 ml-4 lg:text-left text-center">
            <p className="text-green text-regular font-bold lg:self-start self-center">
              {data && data.subHead}
            </p>
            <h1 className="lg:text-xlarge text-small font-normal lg:self-start self-center">
              {' '}
              {data && data.head}
            </h1>
            <p className="lg:text-large text-small font-bold lg:self-start self-center">
              {data && data.boldHeader}
              <span className="border-b-6 mt-4 border-yellow border-rounded-full">
                {data && data.brushedHeader}
              </span>
            </p>
            {data && type !== 'second' ? (
              type === 'first' ? (
                <div className="lg:block hidden">
                  <p className="lg:text-regular text-xsmall mt-8 font-semiBold lg:self-start self-center whitespace-pre-line">
                    {data.description}
                  </p>
                </div>
              ) : (
                <p className="lg:text-regular text-xsmall mt-8 font-semiBold lg:self-start self-center whitespace-pre-line">
                  {data.description}
                </p>
              )
            ) : (
              <ol className="lg:text-regular text-xsmall mt-8 font-semiBold lg:self-start self-center">
                <li className="py-2">
                  Prepare the content of your slides in{' '}
                  <span className="bg-grey-light px-2">.md</span> file.
                </li>
                <li className="py-2">
                  Separate your slides in the file by{' '}
                  <span className="bg-grey-light px-1">---</span>.
                </li>
                <li className="py-2">
                  Leave <span className="bg-grey-light px-1">one space</span>{' '}
                  after each slide.{' '}
                </li>
              </ol>
            )}
            <p className="lg:text-regular text-xsmall mt-8 font-semiBold lg:self-start self-center whitespace-pre-line"></p>
            {type === 'second' && (
              <button
                className="border lg:w-48 rounded-2 bg-primary-default text-white mt-4 p-3 hover:bg-primary-hover text-regular font-bold self-middle"
                onClick={() => {
                  navigate('/presentations')
                }}
              >
                Upload
              </button>
            )}
          </div>
          {data && <img src={data.img} alt="vector" />}
        </div>
      )}
    </div>
  )
}

export default LandingCard
