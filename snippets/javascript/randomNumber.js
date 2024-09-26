// Get a random number

function randomNumber(max = 1, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
