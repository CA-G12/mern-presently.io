interface ICommentProps {
  text: string
}

const Comment = ({ text }: ICommentProps) => {
  return (
    <div className="min-w-96 border-none rounded-1 m-2 p-3 text-justify bg-blue-lightest">
      {text}
    </div>
  )
}

export default Comment
