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

  switch (type) {
    case 'first':
      data = {
        subHead: 'We are better than hackmd?',
        head: 'Presently is the best',
        boldHeader: 'Soulations for your ',
        brushedHeader: 'Busniess',
        img: mainImage,
        styles:
          'relative self-start flex lg:flex-row flex-col justify-around lg:pt-20 pt-12 gap-16 text-blue-dark',
        descipton:
          'An enim nullam tempor sapien gravida donec enim ipsum porta congue magna at pretium purus pretium'
      }
      break
    case 'second':
      data = {
        subHead: 'Get to know Saasmix',
        head: 'Saasmix is easy payment',
        boldHeader: 'processing ',
        brushedHeader: 'for everyone',
        img: frameImage,
        styles:
          'relative self-start flex lg:flex-row lg:flex-row-reverse  flex-col justify-around lg:pt-20 pt-12 gap-24 text-blue-dark pb-20 bt-20',
        descipton:
          'Fully layered dolor sit amet, nobis id expedita dolores layered dolor sit amet laboriosam.'
      }
      break
    case 'third':
      data = {
        subHead: 'Important For Transactions',
        head: 'Useful for facilitating transactions ',
        boldHeader: 'Useful for facilitating transactions ',
        brushedHeader: 'sellers',
        img: computerImage,
        styles:
          'relative self-start lg:flex-row flex-col flex justify-around lg:pt-20 pt-12 gap-16 pb-20 bt-20 text-white',
        descipton:
          'An enim nullam tempor sapien gravida donec enim ipsum porta congue magna at pretium purus pretium'
      }
      break
  }

  return (
    <div className="flex flex-col relative">
      {data && (
        <div className={data.styles}>
          <div className="lg:flex lg:justify-start flex flex-col justify-center align-middle lg:mt-10 mt-2 mr-4 lg:ml-0 ml-4 lg:text-left text-center">
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
            <p className="lg:text-regular text-xsmall mt-8 font-semiBold lg:self-start self-center">
              {data && data.descipton}
            </p>
            {type === 'second' && (
              <button className="border lg:w-48 rounded-2 bg-primary-default text-white mt-4 p-3 hover:bg-primary-hover text-regular font-bold self-middle">
                Discover me
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
