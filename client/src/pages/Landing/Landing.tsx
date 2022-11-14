import { Navbar, LandingCard, Footer } from '../../components'
import './style.css'
import { ReactComponent as Wave } from '../../assets/waves/wave.svg'

const Landing = () => {
  return (
    <>
      <header className="relative lg:min-h-80 lg:pr-32 lg:py-5 lg:pl-32 min-w-fit flex flex-col justify-center p-4 background-grid">
        <Navbar isSinged={false} />
        <LandingCard className="self-center" type="first" />
        <Wave
          className="absolute py-0 pl-0 pr-0 min-w-max left-0"
          style={{ bottom: -15 }}
        />
      </header>
      <section className="lg:min-h-80 lg:pr-32 lg:py-5 lg:pl-32 min-w-fit p-4">
        <LandingCard className="mt-8 bg-white" type="second" />
      </section>
      <section className="relative lg:min-h-80 lg:pr-32 lg:py-5 lg:pl-32 lg:mb-10 min-w-fit p-4 bg-blue-light">
        <LandingCard className="pb-20" type="third" />
        <Wave
          className="absolute py-0 pl-0 pr-0 min-w-max left-0"
          style={{ bottom: 0 }}
        />
      </section>

      <footer className="lg:min-h-80 lg:pr-32 lg:py-5 lg:pl-32 min-w-fit p-4">
        <Footer />
      </footer>
    </>
  )
}

export default Landing
