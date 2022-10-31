import Comment from '../Comment'

const Comments = () => {
  return (
    <>
      <div className="w-max mx-2 border-2 border-primary-default rounded-1 bg-white shadow-lg shadow-cyan-500/50 drop-shadow-xl">
        <Comment text="I question" />
        <Comment text="I have a question I have a questionI have a questionI have a questionI have a questionI have a questionI have a question" />
        <Comment text="I have a question I have a questionI have a question" />
      </div>
    </>
  )
}

export default Comments
