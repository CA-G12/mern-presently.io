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
import { bool } from 'yup'

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

  const handleKeyDown = (event: { code: unknown; target: unknown }) => {
    const updatedValue = event?.target as {
      value: string
    }
    const updatedKey = event?.code as string
    if (updatedKey === 'Enter') {
      setComment(updatedValue.value)
      updatedValue.value = ''
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
    <>
      <div className="mb-10 text-center">
        <div
          dangerouslySetInnerHTML={{ __html: slides[currentIndex] }}
          className="html"
        ></div>
      </div>
      {/*------------------------ Control slides ------------------------ */}
      <div className="absolute inset-x-0 bottom-0 lg:pr-32 pr-10 pl-10 lg:py-5 lg:pl-32 flex-initial">
        <div className="relative justify-self-end flex justify-between items-center mb-4">
          <Link
            to="/presentations"
            className="flex items-center hover:scale-125 focus: outline-none"
          >
            <Home className="hover:text-primary-default lg:w-8 lg:h-8 w-6 h-6 stroke-2" />
          </Link>
          {!owner && isLive && (
            <input
              id="comment"
              onKeyDown={handleKeyDown}
              className="w-full flex-1 text-white py-2 px-2 lg:mx-20 my-2 mx-4 lg:placeholder:placeholder-grey border-b-2 border-grey-light focus:text-black outline-none"
              placeholder="Add a comment"
            />
          )}

          <div className="flex justify-around">
            <button
              className="mr-10 focus: outline-none hover:scale-125"
              onClick={goToPrevious}
            >
              <LeftArrow className="hover:text-primary-default lg:w-8 lg:h-8 stroke-2 w-5 h-5 " />
            </button>
            <button
              className="focus: outline-none hover:scale-125"
              onClick={goToNext}
            >
              <RightArrow className="hover:text-primary-default lg:w-8 lg:h-8 stroke-2  w-5 h-5 " />
            </button>
          </div>
        </div>
        <div className="w-full bg-grey-border lg:h-1.5 h-1 mb-4 rounded-1">
          <div
            className="bg-blue-default lg:h-1.5 h-1rounded-1 progress"
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
    </>
  )
}

export default Slider
