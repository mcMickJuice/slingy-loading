const box = document.querySelector('#box')
let viewPortWidth = window.innerWidth
let viewPortHeight = window.innerHeight
let rotation = 0

window.addEventListener('resize', () => {
  viewPortWidth = window.innerWidth
  viewPortHeight = window.innerHeight
})

let horizontalDirectionFactor = 1
let verticalDirectionFactor = 1
const collisionDirection = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right'
}

const { width: boxWidth, height: boxHeight } = box.getBoundingClientRect()

function parseStyle(positionString) {
  if (positionString === '') {
    return 0
  }

  const [num] = positionString.split('px')

  return Number(num)
}

function getStylePositionAsInt() {
  const { left, top } = box.style

  return {
    left: parseStyle(left),
    top: parseStyle(top)
  }
}

function checkCollision() {
  // TODO: get boxLeft, bottom etc
  const { left, top } = getStylePositionAsInt()

  const result = {}

  if (left <= 0) {
    result.horizontal = collisionDirection.left
  } else if (left + boxWidth >= viewPortWidth) {
    result.horizontal = collisionDirection.right
  }

  if (top <= 0) {
    result.vertical = collisionDirection.top
  } else if (top + boxHeight >= viewPortHeight) {
    result.vertical = collisionDirection.bottom
  }

  return result
}

function onLoop() {
  const collisionResult = checkCollision()

  if (collisionResult.horizontal) {
    horizontalDirectionFactor =
      collisionResult.horizontal === collisionDirection.left ? 1 : -1
    rotation += 90
  }

  if (collisionResult.vertical) {
    verticalDirectionFactor =
      collisionResult.vertical === collisionDirection.top ? 1 : -1
    rotation += 90
  }

  const { left, top } = getStylePositionAsInt()
  const newLeft = left + 2 * horizontalDirectionFactor + 'px'
  const newTop = top + 3 * verticalDirectionFactor + 'px'

  box.style.left = newLeft
  box.style.top = newTop
  box.style.transform = `rotate(${rotation}deg)`
}

// start box in middle
// move box 1px at a time, horizaontally and vertically
// get viewport width and height
// detect collision after each loop

function doLoop() {
  onLoop()
  requestAnimationFrame(doLoop)
}

doLoop()
