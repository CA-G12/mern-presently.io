import { Navbar, LandingCard } from '../../components'
import './style.css'

export default function Landing() {
  return (
    <div>
      <div className="min-h-80 pr-32 py-5 pl-32 background-grid">
        <Navbar />
        <LandingCard type="first" />
      </div>
      <div className="pr-32 py-5 pl-32 mb-12 mt-12">
        <LandingCard className="mt-8 bg-white" type="second" />
      </div>
      <div className="pr-32 py-5 pl-32 mb-12 mt-12 bg-primary-default text-white">
        <LandingCard className="pb-20" type="third" />
      </div>
    </div>
  )
}
