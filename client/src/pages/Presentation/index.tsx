import { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import SyncLoader from 'react-spinners/SyncLoader'

import './styles.css'
import { slideApi } from '../../api'
import Slider from '../../components/Slider'
import Comments from '../../components/Comments'
import { ReactComponent as Bell } from '../../assets/SlidesIcons/bell.svg'
import { ReactComponent as Share } from '../../assets/SlidesIcons/share.svg'
import useAuth from '../../hooks/useAuth'

const Presentation = () => {
  const { id } = useParams() as { id: string }
  const [slides, setSlides] = useState([])
  const [openComments, setOpenComments] = useState(false)
  const [link, setLink] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch, owner, comments } = useAuth()
  const commentsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (commentsRef) {
      document.addEventListener('mousedown', onClickOutSide)
    }

    return () => {
      document.removeEventListener('mousedown', onClickOutSide)
    }
  }, [])

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
    setIsLoading(true)
    slideApi
      .getSlide(id)
      .then(data => {
        setSlides(data.data.slide.htmlContent.split('<hr>'))
        setLink(data.data.slide.shortenLink)

        dispatch({
          type: 'OWNER',
          payload: { slideID: data.data.slide.info._id }
        })
      })
      .then(() => setIsLoading(false))
  }, [])

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

  return (
    <div className="h-screen flex flex-col">
      {/* ------------------------Header------------------------*/}
      <div className="absolute lg:min-h-80 lg:pr-32 lg:py-5 lg:pl-32 px-2 w-screen flex justify-between items-start">
        <div className="">
          {owner && (
            <button
              className="focus:outline-none relative"
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
            <Comments openCommentsRef={commentsRef} visible={openComments} />
          )}
        </div>
        <button className="focus:outline-none hover:scale-125" onClick={copy}>
          <Share strokeWidth={2} />
        </button>
      </div>
      {/* ------------------------Slides------------------------ */}
      <div className="flex justify-center items-center flex-1 lg:pr-32 lg:py-5 lg:pl-32">
        <div>
          <Slider
            slides={
              slides[slides.length - 1] === '' ||
              slides[slides.length - 1] === '\n'
                ? slides.slice(0, -1)
                : slides
            }
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default Presentation
