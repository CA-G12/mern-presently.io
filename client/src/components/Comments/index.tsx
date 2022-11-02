import './styles.css'
import Comment from '../Comment'

const Comments = () => {
  return (
    <>
      <div className="w-max mx-2 p-3 border-2 border-grey-light rounded-1 bg-white shadow-lg shadow-cyan-500/50 drop-shadow-xl max-h-65 overflow-y-scroll comments">
        <p className="px-3 text-primary-default">Comments</p>
        <Comment text="I question" />
        <Comment text="I have a question I have a questionI have a questionI have a questionI have a questionI have a questionI have a question" />
        <Comment text="I have a question I have a questionI have a question" />
        <Comment text="I have a question I have a questionI have a question" />
        <Comment text="I have a question I have a questionI have a question" />
        <Comment text="I have a question I have a questionI have a question" />
        <Comment text="I have a question I have a questionI have a question" />
        <Comment text="I have a question I have a questionI have a question" />
        <Comment text="I have a question I have a questionI have a question" />
        <Comment text="I have a question I have a questionI have a question" />
        <Comment text="I have a question I have a questionI have a questionI have a questionI have a questionI have a questionI have a question" />
        <Comment text="I have a question I have a questionI have a question" />
        <Comment text="I have a question I have a questionI have a question" />
        <Comment text="I have a question I have a questionI have a questionI have a questionI have a questionI have a questionI have a question" />
        <Comment text="I have a question I have a questionI have a question" />
        <Comment text="I have a question I have a questionI have a question" />
        <Comment text="I have a question I have a questionI have a question" />
      </div>
    </>
  )
}

export default Comments
