export const DEFAULT_SETTINGS = {
  containerId: '#carousel',
  slideId: '.item',
  interval: 5000,
  isPlaying: true,
  pauseOnHover: true
  // swipeThreshold: 100,
  // keyboardControl: true,
  // infinite: true,
  // autoplay: true
}

export const CSS_CLASSES = {
  ACTIVE: 'active',
  INDICATORS: 'indicators',
  INDICATOR: 'indicator',
  CONTROLS: 'controls',
  PAUSE_BTN: 'control-pause',
  PREV_BTN: 'control-prev',
  NEXT_BTN: 'control-next'
}

export const ELEMENT_IDS = {
  INDICATORS_CONTAINER: 'indicators-container',
  PAUSE_BTN: 'pause-btn',
  PREV_BTN: 'prev-btn',
  NEXT_BTN: 'next-btn',
  PAUSE_ICON: 'fa-pause-icon',
  PLAY_ICON: 'fa-play-icon'
}

export const KEYS = {
  SPACE: 'Space',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight'
}

export default {
  DEFAULT_SETTINGS,
  CSS_CLASSES,
  ELEMENT_IDS,
  KEYS
}
