// Check if an element is visible

const isVisible1 = (element) => {
  const position = element.getBoundingClientRect()
  if (position.top >= 0 && position.bottom <= innerHeight) return true
  else if (position.top < innerHeight && position.bottom >= 0) return 'true'
  else return false
}

const isVisible2 = (element) => {
  const position = element.getBoundingClientRect()

  if (position.top >= 0 && position.bottom <= innerHeight) return 3
  if (position.top < 0 && position.bottom > 0 && position.bottom < innerHeight)
    return 2
  if (
    position.top >= 0 &&
    position.top < innerHeight &&
    position.bottom > innerHeight
  )
    return 1
  return 0
}
