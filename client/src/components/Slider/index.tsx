import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './styles.css'
import { useKeyPress } from '../../hooks/useKeyPress'

interface ISliderProps {
  slides: string[]
}

const Slider = ({ slides }: ISliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate()

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

  useKeyPress(goToNext, ['ArrowRight'])
  useKeyPress(goToPrevious, ['ArrowLeft'])

  return (
    <>
      <div className="mb-20 text-center">
        <div
          dangerouslySetInnerHTML={{ __html: slides[currentIndex] }}
          className="html"
        ></div>
      </div>
      {/*------------------------ Control slides ------------------------ */}
      <div className="absolute inset-x-0 bottom-0 lg:pr-32 p-4 lg:py-5 lg:pl-32 flex-initial ">
        <div className="justify-self-end flex justify-center">
          <button onClick={() => navigate('/user')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              color="grey"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </button>
          <input
            id="comment"
            className="w-full text-white py-2 px-2 mx-20 my-2 placeholder-grey border-b-2 border-grey-light focus:text-black outline-none"
            placeholder="Add a comment ..."
          />
          <div className="flex justify-around ">
            <button
              className="mr-10 focus: outline-none"
              onClick={goToPrevious}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                color="grey"
                className="h-10 w-10 hover:text-primary-default"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button className="focus: outline-none" onClick={goToNext}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                color="grey"
                className="h-10 w-10 hover:text-primary-default"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full bg-grey-border h-1.5 mb-4 rounded-1">
          <div
            className="bg-blue-default h-1.5 rounded-1 progress"
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
