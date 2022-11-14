interface ICommentProps {
  text: string
}

const Comment = ({ text }: ICommentProps) => {
  return (
    <div className="min-w-96 border-none rounded-1 m-2 p-3 bg-blue-lightest break-words">
      {text}
    </div>
  )
}

export default Comment
