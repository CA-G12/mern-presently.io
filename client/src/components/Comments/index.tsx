import './styles.css'
import Comment from '../Comment'
import { useState, useEffect, LegacyRef } from 'react'
import useAuth from '../../hooks/useAuth'

interface ICommentsProps {
  visible: boolean
  openCommentsRef: LegacyRef<HTMLDivElement> | undefined
}
const Comments = ({ visible, openCommentsRef }: ICommentsProps) => {
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
      {visible && (
        <div
          ref={openCommentsRef}
          className="absolute sm:w-96 w-72 mx-2 p-3 border-2 border-grey-light rounded-1 bg-white shadow-lg shadow-cyan-500/50 drop-shadow-xl max-h-65 overflow-y-auto comments"
        >
          <p className="px-3 text-primary-default">Comments</p>
          {slideId && comments[slideId] && comments[slideId].length > 0 ? (
            comments[slideId]
              .slice()
              .reverse()
              .map((el, i) => <Comment key={i} text={el} />)
          ) : (
            <p className="p-3 text-grey-light">No comments yet</p>
          )}
        </div>
      )}
    </>
  )
}

export default Comments
