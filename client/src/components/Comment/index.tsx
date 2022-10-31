interface ICommentProps {
  text: string
}

const Comment = ({ text }: ICommentProps) => {
  return (
    <>
      <div className="max-w-sm border-2 border-primary-default m-2 rounded-1 p-3 text-justify">
        {text}
      </div>
    </>
  )
}

export default Comment
