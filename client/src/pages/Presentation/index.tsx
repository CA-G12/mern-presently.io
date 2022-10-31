import './styles.css'
import { useEffect, useState } from 'react'

import './styles.css'
import axios from '../../api/axios'
import Slider from '../../components/Slider'
import Comments from '../../components/Comments'
import { ReactComponent as Bell } from '../../assets/SlidesIcons/bell.svg'
import { ReactComponent as Share } from '../../assets/SlidesIcons/share.svg'

const Presentation = () => {
  const [slides, setSlides] = useState([])

  // TODO: test, remove it later
  useEffect(() => {
    axios({
      method: 'get',
      url: '/test'
    }).then(data => setSlides(data.data.split('<hr>')))
  })

  return (
    <div className="h-screen flex flex-col">
      {/* ------------------------Header------------------------*/}
      <div className="absolute lg:min-h-80 lg:pr-32 lg:py-5 lg:pl-32 w-screen flex justify-between items-start">
        <div>
          <button className="focus:outline-none hover:scale-125">
            <Bell strokeWidth={2} />
          </button>
          <Comments />
        </div>
        <button className="focus:outline-none hover:scale-125">
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
