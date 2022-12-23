import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ws from 'socket.io-client'

import './styles.css'
import { useKeyPress } from '../../hooks/useKeyPress'
import { ReactComponent as LeftArrow } from '../../assets/SlidesIcons/leftArrow.svg'
import { ReactComponent as RightArrow } from '../../assets/SlidesIcons/rightArrow.svg'
import { ReactComponent as Home } from '../../assets/SlidesIcons/home.svg'
import useAuth from '../../hooks/useAuth'
import config from '../../config'
import './styles.css'

const { wsBaseUrl } = config

const socket = ws(wsBaseUrl, {
  autoConnect: false
})

interface ISliderProps {
  slides: string[]
  isLoading: boolean
  isLive: boolean
}

const Slider = ({ slides, isLive }: ISliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [comment, setComment] = useState('')
  const [tempComment, setTempComment] = useState('')

  const { dispatch, owner } = useAuth()

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const handleKeyDown = (event: { code: unknown }) => {
    const updatedKey = event?.code as string
    if (updatedKey === 'Enter') {
      setComment(tempComment)
      setTempComment('')
    }
  }

  const sendComment = () => {
    if (tempComment !== '') {
      setComment(tempComment)
      setTempComment('')
    }
  }

  useEffect(() => {
    socket.open()

    const slideID = window.location.href.split('/')[4]

    if (comment) {
      socket.emit('comments', comment, slideID)
    }

    if (owner) {
      socket.on('owner', (comment, slideId) => {
        dispatch({
          type: 'ADD_COMMENT',
          payload: { comment: { text: comment, slideId } }
        })
      })
    }

    return () => {
      socket.removeAllListeners()
      socket.close()
    }
  }, [comment])

  useKeyPress(goToNext, ['ArrowRight'])
  useKeyPress(goToPrevious, ['ArrowLeft'])

  return (
    <div className="h-full w-screen lg:p-0 p-4 flex flex-col justify-between items-stretch">
      <div></div>
      <div className="px-2 text-center flex justify-center lg:pr-32 pr-4 pl-4 lg:py-5 lg:pl-32">
        <div
          dangerouslySetInnerHTML={{ __html: slides[currentIndex] }}
          className="m-2 html"
        ></div>
      </div>
      {/*------------------------ Control slides ------------------------ */}
      <div className="w-full lg:pr-32 pr-4 pl-4 lg:py-5 lg:pl-32">
        <div className="relative flex justify-between items-center mb-4">
          {!owner ? (
            <Link
              to="/presentations"
              className="lg:block hidden flex items-center hover:scale-125 focus:outline-none"
            >
              <Home className="hover:text-primary-default lg:w-8 lg:h-8 w-6 h-6 stroke-2" />
            </Link>
          ) : (
            <Link
              to="/presentations"
              className="flex items-center hover:scale-125 focus:outline-none"
            >
              <Home className="hover:text-primary-default lg:w-8 lg:h-8 w-6 h-6 stroke-2" />
            </Link>
          )}
          {!owner && isLive && (
            <div className="w-full relative flex justify-center items-center mr-2">
              <input
                id="comment"
                onKeyDown={handleKeyDown}
                value={tempComment}
                onChange={e => setTempComment(e.target.value)}
                className="w-full justify-center items-center flex-1 lg:mx-20 my-2 mx-4 lg:placeholder:placeholder-grey border-b-2 border-grey-light focus:text-black outline-none focus:border-primary-default"
                placeholder="Add a comment"
              />
              <a
                className="lg:hidden text-primary-default hover:text-grey-hover"
                onClick={sendComment}
              >
                Send
              </a>
            </div>
          )}

          <div className="flex justify-around">
            <button
              className="mr-10 focus:outline-none hover:scale-125"
              onClick={goToPrevious}
            >
              <LeftArrow className="hover:text-primary-default lg:w-8 lg:h-8 stroke-2 w-5 h-5 " />
            </button>
            <button
              className="focus:outline-none hover:scale-125"
              onClick={goToNext}
            >
              <RightArrow className="hover:text-primary-default lg:w-8 lg:h-8 stroke-2  w-5 h-5 " />
            </button>
          </div>
        </div>
        <div className="w-full bg-grey-border lg:h-1.5 h-1 mb-4 rounded-1">
          <div
            className="bg-blue-default lg:h-1.5 h-1 rounded-1 progress"
            style={{
              width: `${
                currentIndex !== slides.length - 1
                  ? (currentIndex / slides.length) * 100
                  : 100
              }%`
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Slider
