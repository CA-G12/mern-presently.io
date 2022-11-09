import './styles.css'
import Comment from '../Comment'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useEffect } from 'react'

const Comments = () => {
  const { comments } = useAuth()
  const [slideId, setSlideId] = useState<string>()

  useEffect(() => {
    const id = window.location.href.split('/')[4]

    setSlideId(id)

    return () => {
      setSlideId('')
    }
  }, [])

  return (
    <>
      <div className="w-max mx-2 p-3 border-2 border-grey-light rounded-1 bg-white shadow-lg shadow-cyan-500/50 drop-shadow-xl max-h-65 overflow-y-scroll comments">
        <p className="px-3 text-primary-default">Comments</p>
        {slideId &&
          comments[slideId] &&
          comments[slideId].map((el, i) => <Comment key={i} text={el} />)}
      </div>
    </>
  )
}

export default Comments
