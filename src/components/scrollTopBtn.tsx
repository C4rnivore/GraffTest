import { useState, useEffect } from "react"
import topArrow from '../assets/icons/top-arrow.svg'

function ScrollToTopButton() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    show && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-white hover:bg-gray-100 text-blue-500 p-3 rounded-full shadow-lg hover:cursor-pointer border border-gray-400"
      >
        <img className="w-5 h-5" src={topArrow} alt="" />
      </button>
    )
  )
}

export default ScrollToTopButton