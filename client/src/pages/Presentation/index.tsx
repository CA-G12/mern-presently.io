import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import './styles.css'
import axios from '../../api/axios'
import Slider from '../../components/Slider'
import Comments from '../../components/Comments'
import { ReactComponent as Bell } from '../../assets/SlidesIcons/bell.svg'
import { ReactComponent as Share } from '../../assets/SlidesIcons/share.svg'

const Presentation = () => {
  const [slides, setSlides] = useState([])
  const [openComments, setOpenComments] = useState(false)
  const [text, setText] = useState('')

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    toast.success('Text copied')
  }

  // TODO: get the id of the current slide
  useEffect(() => {
    axios({
      method: 'get',
      url: '/test'
    }).then(data => setSlides(data.data.split('<hr>')))

    axios({
      method: 'get',
      url: '/slides/share/1'
    }).then(data => setText(data.data.link))
  }, [])

  return (
    <div className="h-screen flex flex-col">
      {/* ------------------------Header------------------------*/}
      <div className="absolute lg:min-h-80 lg:pr-32 lg:py-5 lg:pl-32 w-screen flex justify-between items-start">
        <div>
          <button
            className="focus:outline-none hover:scale-125"
            onClick={() => setOpenComments(!openComments)}
          >
            <Bell strokeWidth={2} />
          </button>
          {openComments && <Comments />}
        </div>
        <button className="focus:outline-none hover:scale-125" onClick={copy}>
          <Share strokeWidth={2} />
        </button>
      </div>
      {/* ------------------------Slides------------------------ */}
      <div className="flex justify-center items-center flex-1 lg:pr-32 lg:py-5 lg:pl-32">
        <div>
          <Slider slides={slides[length - 1] ? slides : slides.slice(0, -1)} />
        </div>
      </div>
    </div>
  )
}

export default Presentation
