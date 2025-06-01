import Carousel from './core.js'
import { DEFAULT_SETTINGS } from './helpers/config.js'

class SwipeCarousel extends Carousel {
  #startPosX
  #endPosX
  #swipeThreshold
  #isDragging = false

  constructor(options) {
    const swipeSettings = {
      ...DEFAULT_SETTINGS,
      swipeThreshold: 100,
      ...options
    }
    super(swipeSettings)
    this.slidesContainer = this.slides[0]?.parentElement
    this.#swipeThreshold = swipeSettings.swipeThreshold
  }

  #preventDrag(e) {
    e.preventDefault()
    return false
  }

  #swipeStart(e) {
    this.#isDragging = true
    this.#startPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX
  }

  #swipeEnd(e) {
    if (!this.#isDragging) return

    this.#endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX
    this.#isDragging = false

    const swipeDistance = this.#endPosX - this.#startPosX
    if (swipeDistance > this.#swipeThreshold) this.prev()
    if (swipeDistance < -this.#swipeThreshold) this.next()
  }

  #mouseLeave() {
    this.#isDragging = false
  }

  init() {
    super.init()
    this.container.addEventListener('dragstart', this.#preventDrag)
    this.container.addEventListener('touchstart', this.#swipeStart.bind(this)), { passive: true }
    this.container.addEventListener('mousedown', this.#swipeStart.bind(this))
    this.container.addEventListener('touchend', this.#swipeEnd.bind(this))
    this.container.addEventListener('mouseup', this.#swipeEnd.bind(this))
    this.container.addEventListener('mouseleave', this.#mouseLeave.bind(this))
  }
}

export default SwipeCarousel