import { DEFAULT_SETTINGS, KEYS, ELEMENT_IDS, CSS_CLASSES } from './helpers/config.js'

class Carousel {
  #currentSlide
  #timerId

  #pauseBtn
  #prevBtn
  #nextBtn
  #pauseIcon
  #playIcon
  #indicatorsContainer
  #indicatorItems

  #SLIDES_COUNT
  #CODE_ARROW_LEFT
  #CODE_ARROW_RIGHT
  #CODE_SPACE
  #FA_PAUSE
  #FA_PLAY
  #FA_PREV
  #FA_NEXT

  constructor(options) {
    const settings = {
      ...DEFAULT_SETTINGS,
      ...options
    }
    this.container = document.querySelector(settings.containerId)
    this.slides = this.container.querySelectorAll(settings.slideId)
    this.TIMER_INTERVAL = settings.interval
    this.isPlaying = settings.isPlaying
    this.pauseOnHover = settings.pauseOnHover
  }

  #initProps() {
    this.#currentSlide = 0

    this.#SLIDES_COUNT = this.slides.length
    this.#CODE_SPACE = KEYS.SPACE
    this.#CODE_ARROW_LEFT = KEYS.ARROW_LEFT
    this.#CODE_ARROW_RIGHT = KEYS.ARROW_RIGHT
    this.#FA_PAUSE = '<i class="fas fa-pause"></i>'
    this.#FA_PLAY = '<i class="fas fa-play"></i>'
    this.#FA_PREV = '<i class="fas fa-chevron-left"></i>'
    this.#FA_NEXT = '<i class="fas fa-chevron-right"></i>'
  }

  #initControls() {
    const PAUSE_ICON = `<span id="${ELEMENT_IDS.PAUSE_ICON}">${this.#FA_PAUSE}</span>`
    const PLAY_ICON = `<span id="${ELEMENT_IDS.PLAY_ICON}">${this.#FA_PLAY}</span>`

    const PAUSE_BTN = `<div id="${ELEMENT_IDS.PAUSE_BTN}" class="${CSS_CLASSES.PAUSE_BTN}">${PAUSE_ICON}${PLAY_ICON}</div>`
    const PREV_BTN = `<div id="${ELEMENT_IDS.PREV_BTN}" class="${CSS_CLASSES.PREV_BTN}">${this.#FA_PREV}</div>`
    const NEXT_BTN = `<div id="${ELEMENT_IDS.NEXT_BTN}" class="${CSS_CLASSES.NEXT_BTN}">${this.#FA_NEXT}</div>`

    const controlsContainer = document.createElement('div')
    controlsContainer.setAttribute('class', CSS_CLASSES.CONTROLS)
    controlsContainer.innerHTML = PAUSE_BTN + PREV_BTN + NEXT_BTN

    this.container.append(controlsContainer)

    this.#pauseBtn = this.container.querySelector(`#${ELEMENT_IDS.PAUSE_BTN}`)
    this.#prevBtn = this.container.querySelector(`#${ELEMENT_IDS.PREV_BTN}`)
    this.#nextBtn = this.container.querySelector(`#${ELEMENT_IDS.NEXT_BTN}`)

    this.#pauseIcon = this.container.querySelector(`#${ELEMENT_IDS.PAUSE_ICON}`)
    this.#playIcon = this.container.querySelector(`#${ELEMENT_IDS.PLAY_ICON}`)

    this.isPlaying ? this.#pauseVisible() : this.#playVisible()
  }

  #initIndicators() {
    const indicatorsContainer = document.createElement('div')
    indicatorsContainer.setAttribute('id', ELEMENT_IDS.INDICATORS_CONTAINER)
    indicatorsContainer.setAttribute('class', CSS_CLASSES.INDICATORS)

    for (let i = 0; i < this.#SLIDES_COUNT; i++) {
      const indicator = document.createElement('div')
      indicator.setAttribute('class', i ? CSS_CLASSES.INDICATOR : `${CSS_CLASSES.INDICATOR} ${CSS_CLASSES.ACTIVE}`)
      indicator.dataset.slideTo = `${i}`
      indicatorsContainer.append(indicator)
    }

    this.container.append(indicatorsContainer)
    this.#indicatorsContainer = this.container.querySelector(`#${ELEMENT_IDS.INDICATORS_CONTAINER}`)
    this.#indicatorItems = this.container.querySelectorAll(`.${CSS_CLASSES.INDICATOR}`)
  }

  #initEventListeners() {
    this.#pauseBtn.addEventListener('click', this.pausePlay.bind(this))
    this.#nextBtn.addEventListener('click', this.next.bind(this))
    this.#prevBtn.addEventListener('click', this.prev.bind(this))
    this.#indicatorsContainer.addEventListener('click', this.#indicatorClick.bind(this))
    document.addEventListener('keydown', this.#keydown.bind(this))
    if (this.pauseOnHover) {
      this.container.addEventListener('mouseenter', this.pause.bind(this))
      this.container.addEventListener('mouseleave', this.play.bind(this))
    }
  }

  #gotoNth(n) {
    this.slides[this.#currentSlide].classList.toggle(CSS_CLASSES.ACTIVE)
    this.#indicatorItems[this.#currentSlide].classList.toggle(CSS_CLASSES.ACTIVE)
    this.#currentSlide = (n + this.#SLIDES_COUNT) % this.#SLIDES_COUNT
    this.slides[this.#currentSlide].classList.toggle(CSS_CLASSES.ACTIVE)
    this.#indicatorItems[this.#currentSlide].classList.toggle(CSS_CLASSES.ACTIVE)
  }

  #gotoPrev() {
    this.#gotoNth(this.#currentSlide - 1)
  }

  #gotoNext() {
    this.#gotoNth(this.#currentSlide + 1)
  }

  #indicatorClick(e) {
    const { target } = e
    if (target && target.classList.contains(CSS_CLASSES.INDICATOR)) {
      this.pause()
      this.#gotoNth(+target.dataset.slideTo)
    }
  }

  #keydown(e) {
    const { code } = e
    const isCarouselKey = [this.#CODE_ARROW_LEFT, this.#CODE_ARROW_RIGHT, this.#CODE_SPACE].includes(code)
    if (isCarouselKey) {
      e.preventDefault()
      if (code === this.#CODE_ARROW_LEFT) this.prev()
      if (code === this.#CODE_ARROW_RIGHT) this.next()
      if (code === this.#CODE_SPACE) this.pausePlay()
    }
  }

  #tick() {
    if (!this.isPlaying) return
    if (this.#timerId) return
    this.#timerId = setInterval(() => this.#gotoNext(), this.TIMER_INTERVAL)
  }

  #pauseVisible(isVisible = true) {
    this.#pauseIcon.style.opacity = isVisible ? 1 : 0
    this.#playIcon.style.opacity = isVisible ? 0 : 1
  }

  #playVisible() {
    this.#pauseVisible(false)
  }

  pause() {
    if (!this.isPlaying) return
    this.#playVisible()
    this.isPlaying = false
    clearInterval(this.#timerId)
    this.#timerId = null
  }

  play() {
    if (this.isPlaying) return
    this.#pauseVisible()
    this.isPlaying = true
    this.#tick()
  }

  pausePlay() {
    this.isPlaying ? this.pause() : this.play()
  }

  prev() {
    this.pause()
    this.#gotoPrev()
  }

  next() {
    this.pause()
    this.#gotoNext()
  }

  init() {
    this.#initProps()
    this.#initControls()
    this.#initIndicators()
    this.#initEventListeners()
    this.#tick()
  }
}

export default Carousel