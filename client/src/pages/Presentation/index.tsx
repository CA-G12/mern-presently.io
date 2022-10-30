import './styles.css'
import { useEffect, useState } from 'react'

import './styles.css'
import axios from '../../api/axios'
import Slider from '../../components/Slider'
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
      <div className="relative lg:min-h-80 lg:pr-32 lg:py-5 lg:pl-32 min-w-fit flex align-middle justify-between p-4">
        <button>
          <Bell strokeWidth={2} />
        </button>
        <button>
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
