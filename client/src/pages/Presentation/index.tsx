import { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import SyncLoader from 'react-spinners/SyncLoader'
import { AxiosError } from 'axios'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

import './styles.css'
import { slideApi } from '../../api'
import Slider from '../../components/Slider'
import Comments from '../../components/Comments'
import { ReactComponent as Bell } from '../../assets/SlidesIcons/bell.svg'
import { ReactComponent as Share } from '../../assets/SlidesIcons/share.svg'
import { ReactComponent as FullScreenIcon } from '../../assets/SlidesIcons/fullscreen.svg'
import useAuth from '../../hooks/useAuth'
import NotFound from '../404'

const Presentation = () => {
  const { id } = useParams() as { id: string }
  const [slides, setSlides] = useState([])
  const [openComments, setOpenComments] = useState(false)
  const [link, setLink] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isLive, setIsLive] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)
  const [fullscreen, setFullScreen] = useState(false)

  const fullScreenHandler = useFullScreenHandle()

  const { dispatch, owner, comments } = useAuth()
  const commentsRef = useRef<HTMLDivElement>(null)
  const [responseError, setResponseError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (commentsRef) {
      document.addEventListener('mousedown', onClickOutSide)
    }

    return () => {
      document.removeEventListener('mousedown', onClickOutSide)
    }
  }, [])

  const toggleFullScreen = () => {
    if (fullscreen) {
      fullScreenHandler.exit()
    } else {
      fullScreenHandler.enter()
    }
    setFullScreen(!fullscreen)
  }

  const onClickOutSide = (e: any) => {
    if (commentsRef.current && !commentsRef.current.contains(e.target)) {
      setOpenComments(false)
    }
  }

  const copy = async () => {
    await navigator.clipboard.writeText(link)
    toast.success('link copied')
  }

  useEffect(() => {
    const getSlide = async () => {
      try {
        setIsLoading(true)

        const res = await slideApi.getSlide(id)

        if (res.data.slide.info.isLive) {
          setIsLive(true)
        }

        if (res.data.slide.info.isPrivate) {
          setIsPrivate(true)
        }

        setSlides(res.data.slide.htmlContent.split('<hr>'))

        setLink(res.data.slide.shortenLink)

        dispatch({
          type: 'OWNER',
          payload: { slideID: res.data.slide.info._id }
        })

        setIsLoading(false)
      } catch (error) {
        const exception = error as AxiosError

        if (exception.response) {
          setResponseError(true)
        }
        setIsLoading(false)
      }
    }

    getSlide()
  }, [])

  useEffect(() => {
    if (isPrivate && !owner) {
      navigate('/404')
    }
  }, [isPrivate])

  if (isLoading) {
    return (
      <SyncLoader
        color="#4982F3"
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
        cssOverride={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      />
    )
  }

  if (responseError) {
    return <NotFound />
  }

  return (
    <div className="lg:h-screen h-mobile">
      <FullScreen
        className="flex h-full flex-col relative bg-white"
        handle={fullScreenHandler}
      >
        {/* ------------------------Header------------------------*/}
        <div className="lg:min-h-80 lg:pr-32 lg:py-5 lg:pl-32 p-6 w-screen flex justify-between items-start">
          {/* Full Screen Button */}
          <div className="flex">
            <div className="lg:block hidden">
              {fullscreen ? (
                <button className="self-start" onClick={toggleFullScreen}>
                  <FullScreenIcon className="w-4 h-4 stroke-2 mr-2 mt-1" />
                </button>
              ) : (
                <button className="self-start" onClick={toggleFullScreen}>
                  <FullScreenIcon className="w-4 h-4 stroke-2 mr-2 mt-1" />
                </button>
              )}
            </div>
            {/* Comments Section */}
            <div>
              {!isPrivate && isLive && owner && (
                <button
                  className="focus:outline-none relative self-start"
                  onClick={() => setOpenComments(!openComments)}
                >
                  {comments[id] && comments[id].length > 0 && (
                    <div className="absolute w-5 h-5 flex justify-center align-center bg-danger circle text-white">
                      <h6>{comments[id].length}</h6>
                    </div>
                  )}
                  <Bell strokeWidth={2} />
                </button>
              )}
              {owner && openComments && (
                <Comments
                  openCommentsRef={commentsRef}
                  visible={openComments}
                />
              )}
            </div>
          </div>

          {/* Share button */}
          <div>
            {isLive && !isPrivate && (
              <button
                className="focus:outline-none hover:scale-125"
                onClick={copy}
              >
                <Share strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
        {/* ------------------------Slides------------------------ */}
        <div className="h-full w-full flex justify-center items-center lg:pr-32 lg:py-5 lg:pl-32">
          <div className="flex flex-col justify-center items-center h-full">
            <Slider
              slides={
                slides[slides.length - 1] === '' ||
                slides[slides.length - 1] === '\n'
                  ? slides.slice(0, -1)
                  : slides
              }
              isLive={isLive}
              isLoading={isLoading}
            />
          </div>
        </div>
      </FullScreen>
    </div>
  )
}

export default Presentation
