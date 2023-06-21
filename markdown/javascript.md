## You can create DOM element from string
```js
export const createElementFromStr1 = (body = '<div></div>') => {
  return new DOMParser().parseFromString(body, 'text/html').body
    .firstElementChild
}

export const createElementFromStr2 = (body) => {
  const element = document.createElement('template')
  element.innerHTML = body
  return element.content
}

export const createElementFromStr3 = (body) => {
  const element = document.createElement('template')
  element.innerHTML = body
  return element.content.firstElementChild
}
```
Source: [createElementFromStr.js](/snippets/javascript/createElementFromStr.js)

<hr /><br />

## Check if an element is visible
```js
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
```
Source: [isElementVisible.js](/snippets/javascript/isElementVisible.js)

<hr /><br />

## Get a random number
```js
export const randomNumber = (max = 1, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
```
Source: [randomNumber.js](/snippets/javascript/randomNumber.js)

<hr /><br />

## Physically select a text/image of a element
```js
const selectElement = (element) => {
  if (document.body.createTextRange) {
    const range = document.body.createTextRange()
    range.moveToElementText(element)
    range.select()
  } else if (window.getSelection) {
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(element)
    selection.removeAllRanges()
    selection.addRange(range)
  }
  return element.textContent.trim()
}
```
Source: [selectElement.js](/snippets/javascript/selectElement.js)

<hr /><br />

## Sort a list of node
```js
const sortElements = (selectors) => {
  let i, switching, b, shouldSwitch
  switching = true
  while (switching) {
    switching = false
    b = document.querySelectorAll(selectors)
    for (i = 0; i < b.length - 1; i++) {
      shouldSwitch = false
      if (
        b[i].textContent.toLowerCase().trim() >
        b[i + 1].textContent.toLowerCase().trim()
      ) {
        shouldSwitch = true
        break
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i])
      switching = true
    }
  }
}
```
Source: [sortElements.js](/snippets/javascript/sortElements.js)

<hr /><br />

## Wait for sometime...
```js
const wait = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
```
Source: [wait.js](/snippets/javascript/wait.js)