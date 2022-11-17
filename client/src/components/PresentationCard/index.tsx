import { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as PresentationIcon } from '../../assets/PresentationIcons/presentationIcon.svg'
import { ReactComponent as LivePresentation } from '../../assets/PresentationIcons/livePresentation.svg'
import { ReactComponent as DeletePresentation } from '../../assets/PresentationIcons/deletePresentation.svg'
import { slideApi } from '../../api'
import useAuth from '../../hooks/useAuth'
import { SlideInterface } from '../../interfaces/SlideInterface'

interface IPresentationCardOProps {
  slide: SlideInterface
  type: string
}

const handleAlert = (status: string, message: string) => {
  if (status === 'success') {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000
    })
  }

  if (status === 'error') {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000
    })
  }
}

const PresentationCard = ({ slide, type }: IPresentationCardOProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputVisible, setInputVisible] = useState(false)
  const navigate = useNavigate()
  const { dispatch } = useAuth()
  const [title, setTitle] = useState(slide.title)
  const [flag, setFlag] = useState(false)

  const [slideState, setSlideState] = useState({
    id: slide._id,
    title: slide.title,
    isLive: slide.isLive,
    isPrivate: slide.isPrivate,
    link: slide.link
  })

  const updateSlide = async () => {
    try {
      await slideApi.updateSlide(slideState)

      dispatch({
        type: 'CHANGE_TITLE',
        payload: { slideId: slideState.id, newTitle: title }
      })
    } catch (error) {
      toast.error("Name Can't be less than one character")
      setTitle(slide.title)
    }
  }

  useEffect(() => {
    if (inputVisible) {
      document.addEventListener('mousedown', onClickOutSide)
    }

    return () => {
      document.removeEventListener('mousedown', onClickOutSide)
    }
  }, [slideState])

  useEffect(() => {
    setSlideState(prevState => {
      return { ...prevState, title: title }
    })
  }, [title])

  useEffect(() => {
    updateSlide()
  }, [flag])

  const handleDeletingSlide = async () => {
    try {
      await slideApi.deleteSlide(slide._id)

      dispatch({ type: 'DELETE_SLIDE', payload: { slideID: slide._id } })
      handleAlert('success', 'Presentation deleted Successfully')
    } catch {
      handleAlert('error', 'Something went wrong')
    }
  }

  const onClickOutSide = (e: any) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setInputVisible(false)
      updateSlide()
    }
  }

  return (
    <div className="relative flex flex-col justify-between bg-grey-background w-72 rounded-1">
      <div className="absolute mt-4 right-4">
        <a
          className="hover:bg-blue-default cursor-pointer"
          onClick={handleDeletingSlide}
        >
          <DeletePresentation
            strokeWidth={2}
            height={20}
            width={20}
            className="hover:text-danger hover:scale-125"
          />
        </a>
      </div>
      <div className="flex mt-4 ml-4 mb-8 cursor-pointer">
        {slideState.isPrivate ? (
          <PresentationIcon className="mr-4 cursor-pointer" />
        ) : (
          <PresentationIcon
            className="mr-4 cursor-pointer"
            onClick={() => navigate(`/presentations/${slide._id}`)}
          />
        )}
        {inputVisible ? (
          <input
            className="bg-grey-background focus:outline-none"
            ref={inputRef}
            value={title}
            onChange={e => {
              setTitle(e.target.value)
            }}
          />
        ) : (
          <span onClick={() => setInputVisible(true)}>{title}</span>
        )}
      </div>
      {type === 'uploaded' ? (
        <div className="flex border border-b-0 border-l-0 border-r-0 border-white p-4">
          <div className="flex-1 flex pr-10">
            <button
              className="mr-1"
              onClick={() => {
                setSlideState(prevState => {
                  return { ...prevState, isLive: !slideState.isLive }
                })

                dispatch({
                  type: 'LIVE',
                  payload: {
                    slideId: slideState.id,
                    status: !slideState.isLive
                  }
                })
                setFlag(!flag)
              }}
            >
              <LivePresentation
                strokeWidth={2}
                height={25}
                width={25}
                className={
                  slideState.isLive
                    ? 'text-primary-default ml-1 scale-125'
                    : 'text-black  ml-1 hover:scale-125'
                }
              />
            </button>
            <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-default">
              {slideState.isLive ? 'Live' : 'not live'}
            </span>
          </div>
          <div className="flex justify-between">
            <label
              htmlFor={'default-toggle' + slide._id}
              className="inline-flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id={'default-toggle' + slide._id}
                className="sr-only peer"
                checked={slideState.isPrivate}
                onChange={() => {
                  setSlideState(prevState => {
                    return { ...prevState, isPrivate: !slideState.isPrivate }
                  })

                  dispatch({
                    type: 'PRIVATE',
                    payload: {
                      slideId: slideState.id,
                      status: !slideState.isPrivate
                    }
                  })
                  setFlag(!flag)
                }}
              />
              <div className="w-11 h-6 bg-grey-default rounded-2 peer-focus:outline-none dark:peer-focus:ring-primary-default peer dark:bg-primary-default peer-checked:after:translate-x-full peer-checked:after:border-grey-default after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-default after:rounded-2 after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-default"></div>
              <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-default">
                Private
              </span>
            </label>
          </div>
        </div>
      ) : (
        <div className="relative pt-12 bg-white">
          <div className="absolute top-2">
            <div className="w-72 bg-gray-default h-1.5 mb-4 bg-grey-background rounded-1">
              <div
                className="bg-blue-default h-1.5 rounded-1 dark:bg-blue-default"
                style={{ width: '50%' }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PresentationCard
