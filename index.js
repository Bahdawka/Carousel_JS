/*код на основі прототипів*/

/*function Carousel() {
}

Carousel.prototype = {
  _initProps() {
    this.container = document.querySelector('#carousel')
    this.slidesContainer = this.container.querySelector('#slides-container')
    this.slides = this.container.querySelectorAll('.slide')

    this.SLIDES_COUNT = this.slides.length
    this.TIMER_INTERVAL = 2000
    this.CODE_ARROW_LEFT = 'ArrowLeft'
    this.CODE_ARROW_RIGHT = 'ArrowRight'
    this.CODE_SPACE = 'Space'
    this.FA_PAUSE = '<i class="fas fa-pause"></i>'
    this.FA_PLAY = '<i class="fas fa-play"></i>'
    this.FA_ARROW_LEFT = '<i class="fas fa-chevron-left"></i>'
    this.FA_ARROW_RIGHT = '<i class="fas fa-chevron-right"></i>'

    this.currentSlide = 0
    this.isPlaying = true
    this.timerId = null
    this.swipeStartX = null
    this.swipeEndX = null
  },

  _initControls() {
    const controlsContainer = document.createElement('div')
    controlsContainer.setAttribute('id', 'controls-container')
    controlsContainer.classList.add('controls')

    const PAUSE_BTN = `<div id="pause-btn" class="control control-pause">${this.FA_PAUSE}</div>`

    const PREV_BTN = ` <div id="prev-btn" class="control control-prev">${this.FA_ARROW_LEFT}</div>`

    const NEXT_BTN = `<div id="next-btn" class="control control-next">${this.FA_ARROW_RIGHT}</div>`

    controlsContainer.innerHTML = PAUSE_BTN + PREV_BTN + NEXT_BTN

    this.container.append(controlsContainer)

    this.pauseBtn = this.container.querySelector('#pause-btn')
    this.prevBtn = this.container.querySelector('#prev-btn')
    this.nextBtn = this.container.querySelector('#next-btn')
  },

  _initIndicators() {
    const indicatorsContainer = document.createElement('div')
    indicatorsContainer.setAttribute('id', 'indicators-container')
    indicatorsContainer.classList.add('indicators')

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const indicator = document.createElement('div')
      indicator.setAttribute('class', i ? 'indicator' : 'indicator active')
      indicator.setAttribute('data-slide-to', `${i}`)
      indicatorsContainer.append(indicator)
    }

    this.container.append(indicatorsContainer)
    this.indicatorsContainer = this.container.querySelector('#indicators-container')
    this.indicators = this.container.querySelectorAll('.indicator')
  },

  _initEventListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlayHandler.bind(this))
    this.nextBtn.addEventListener('click', this.nextHandler.bind(this))
    this.prevBtn.addEventListener('click', this.prevHandler.bind(this))
    this.indicatorsContainer.addEventListener('click', this.indicatorClickHandler.bind(this))
    document.addEventListener('keydown', this._keydownHandler.bind(this))
  },

  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('active')
    this.indicators[this.currentSlide].classList.toggle('active')
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT
    this.slides[this.currentSlide].classList.toggle('active')
    this.indicators[this.currentSlide].classList.toggle('active')
  },

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1)
  },

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1)
  },

  _tick() {
    this.timerId = setInterval(() => this._gotoNext(), this.TIMER_INTERVAL)
  },

  _keydownHandler(e) {
    const { code } = e
    if (code === this.CODE_ARROW_LEFT) this.prevHandler()
    if (code === this.CODE_ARROW_RIGHT) this.nextHandler()
    if (code === this.CODE_SPACE) {
      e.preventDefault()
      this.pausePlayHandler()
    }
  },

  pauseHandler() {
    if (!this.isPlaying) return
    this.pauseBtn.innerHTML = this.FA_PLAY
    this.isPlaying = false
    clearInterval(this.timerId)
  },

  playHandler() {
    this.pauseBtn.innerHTML = this.FA_PAUSE
    this.isPlaying = true
    this._tick()
  },

  pausePlayHandler() {
    this.isPlaying ? this.pauseHandler() : this.playHandler()
  },

  prevHandler() {
    this.pauseHandler()
    this._gotoPrev()
  },

  nextHandler() {
    this.pauseHandler()
    this._gotoNext()
  },

  indicatorClickHandler(e) {
    const { target } = e
    if (target && target.classList.contains('indicator')) {
      this.pauseHandler()
      this._gotoNth(+target.getAttribute('data-slide-to'))
    }
  },

  init() {
    this._initProps()
    this._initControls()
    this._initIndicators()
    this._initEventListeners()
    this._tick()
  }
}

Carousel.prototype.constructor = Carousel

function SwipeCarousel() {
  Carousel.apply(this)
}

SwipeCarousel.prototype = Object.create(Carousel.prototype)
SwipeCarousel.prototype.constructor = SwipeCarousel

SwipeCarousel.prototype._initEventListeners = function () {
  Carousel.prototype._initEventListeners.apply(this)
  this.slidesContainer.addEventListener('touchstart', this.swipeStartHandler.bind(this))
  this.slidesContainer.addEventListener('mousedown', this.swipeStartHandler.bind(this))
  this.slidesContainer.addEventListener('touchend', this.swipeEndHandler.bind(this))
  this.slidesContainer.addEventListener('mouseup', this.swipeEndHandler.bind(this))
}

SwipeCarousel.prototype.swipeStartHandler = function (e) {
  this.swipeStartX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX
}

SwipeCarousel.prototype.swipeEndHandler = function (e) {
  this.swipeEndX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX
  if (this.swipeEndX - this.swipeStartX > 100) this.prevHandler()
  if (this.swipeEndX - this.swipeStartX < -100) this.nextHandler()
}

const carousel = new SwipeCarousel()
carousel.init()*/

