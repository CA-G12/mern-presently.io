import './styles.css'

type HorizontalLineWithTextProps = {
  text: string
}

const HorizontalLineWithText = ({ text }: HorizontalLineWithTextProps) => (
  <div className="strike">
    <span>{text}</span>
  </div>
)

export default HorizontalLineWithText
