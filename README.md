# Carousel Implementation Documentation

This project implements an image carousel in two different ways: using ES6 Classes and using Prototypes(Located: prototype-method-branch). Both implementations provide the same functionality with slightly different approaches.

## Features

- Automatic slideshow with configurable interval
- Manual navigation (prev/next buttons)
- Indicator dots for direct slide access
- Play/Pause functionality
- Keyboard controls (Arrow keys and Space)
- Touch/Swipe support for mobile devices
- Mouse drag support
- Pause on hover option

## Prototype-Based Implementation (index.js)

### Main Classes

#### `Carousel`
Base carousel functionality:
- `_initProps()`: Initializes basic properties and selectors
- `_initControls()`: Creates navigation controls (prev, next, pause)
- `_initIndicators()`: Creates slide indicator dots
- `_initEventListeners()`: Sets up event handling
- `_gotoNth(n)`: Switches to specific slide
- `_gotoPrev()`: Goes to previous slide
- `_gotoNext()`: Goes to next slide
- `_tick()`: Handles automatic slideshow
- `pauseHandler()`: Pauses slideshow
- `playHandler()`: Starts slideshow
- `indicatorClickHandler()`: Handles indicator clicks

#### `SwipeCarousel extends Carousel`
Adds touch/swipe functionality:
- `swipeStartHandler()`: Captures start position
- `swipeEndHandler()`: Calculates swipe direction and distance

### Usage Example
```javascript
const carousel = new SwipeCarousel();
carousel.init();
```

## Class-Based Implementation (src/carousel/)

### Core Classes

#### `Carousel` (core.js)
Modern ES6 class implementation with private fields:
```javascript
class Carousel {
  #currentSlide
  #timerId
  // ...other private fields
}
```

Features:
- Configurable settings through constructor
- Private methods for internal operations
- Event delegation pattern
- Keyboard control support
- Automatic play/pause functionality

#### `SwipeCarousel extends Carousel` (swipe.js)
Enhanced carousel with touch/swipe support:
```javascript
class SwipeCarousel extends Carousel {
  #startPosX
  #endPosX
  #swipeThreshold
  #isDragging
}
```

### Configuration Options

```javascript
const DEFAULT_SETTINGS = {
  containerId: '#carousel',     // Container selector
  slideId: '.item',            // Slide element selector
  interval: 5000,             // Autoplay interval in ms
  isPlaying: true,           // Start with autoplay
  pauseOnHover: true,       // Pause on mouse hover
  swipeThreshold: 100      // Minimum swipe distance
}
```

### CSS Classes
```javascript
const CSS_CLASSES = {
  ACTIVE: 'active',
  INDICATORS: 'indicators',
  INDICATOR: 'indicator',
  CONTROLS: 'controls',
  PAUSE_BTN: 'control-pause',
  PREV_BTN: 'control-prev',
  NEXT_BTN: 'control-next'
}
```

### Usage Example
```javascript
import SwipeCarousel from './carousel/swipe.js';

const carousel = new SwipeCarousel({
  slideId: '.item',
  containerId: '.customClass',
  interval: 3500,
  isPlaying: true,
  swipeThreshold: 50
});

carousel.init();
```

## Key Differences Between Implementations

1. **Code Organization**:
   - Prototype: Single file implementation
   - Class: Modular structure with separate files

2. **Privacy**:
   - Prototype: Uses naming conventions (_prefix)
   - Class: Uses modern private fields (#prefix)

3. **Inheritance**:
   - Prototype: Manual prototype chain setup
   - Class: Clean `extends` syntax

4. **Configuration**:
   - Prototype: Hardcoded values
   - Class: Configurable through constructor options


## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers with touch support
- Requires ES6 support (or transpilation for older browsers)
