import SwipeCarousel from './carousel/swipe.js'

const carousel = new SwipeCarousel({
  slideId: '.item',
  containerId: '.customClass',
  interval: 3500,
  isPlaying: true,
  swipeThreshold: 50
})

carousel.init()