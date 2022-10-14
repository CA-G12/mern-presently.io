import './index.css'
import mainImage from '../../assets/LandingInfoPngs/main.png'
import frameImage from '../../assets/LandingInfoPngs/frame.png'
import computerImage from '../../assets/LandingInfoPngs/computer.png'

type CardProps = {
  type: string
}

const LandingCard = ({ type }: CardProps) => {
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
          'relative self-start flex justify-around pt-20 gap-16 text-blue-dark',
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
          'relative self-start flex justify-around pt-20 gap-24 flex-row-reverse text-blue-dark pb-20 bt-20',
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
          'relative self-start flex justify-around pt-20 gap-16 pb-20 bt-20 text-white',
        descipton:
          'An enim nullam tempor sapien gravida donec enim ipsum porta congue magna at pretium purus pretium'
      }
      break
  }

  return (
    <div className="flex flex-col">
      {data && (
        <div className={data.styles}>
          <div className="flex flex-col max-w-lg align-middle justify-start mt-10">
            <p className="text-green text-regular font-bold">
              {data && data.subHead}
            </p>
            <h1 className="text-xlarge"> {data && data.head}</h1>
            <p className="text-large font-bold">
              {data && data.boldHeader}
              <span className="border-b-6 mt-4 border-yellow border-rounded-full">
                {data && data.brushedHeader}
              </span>
            </p>
            <p className="mt-8">{data && data.descipton}</p>
            {type === 'second' && (
              <button className="border w-48 rounded-2 bg-primary-default text-white mt-4 p-3 hover:bg-primary-hover text-regular">
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
