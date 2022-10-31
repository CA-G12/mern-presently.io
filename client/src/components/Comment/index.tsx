interface ICommentProps {
  text: string
}

const Comment = ({ text }: ICommentProps) => {
  return (
    <div className="max-w-sm border-none rounded-1 m-2 p-3 text-justify bg-blue-lightest">
      {text}
    </div>
  )
}

export default Comment
