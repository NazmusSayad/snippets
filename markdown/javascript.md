### createElementFromStr

```javascript
// You can create DOM element from string

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

---

### isElementVisible

```javascript
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
```

Source: [isElementVisible.js](/snippets/javascript/isElementVisible.js)

---

### randomNumber

```javascript
// Get a random number

export const randomNumber = (max = 1, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
```

Source: [randomNumber.js](/snippets/javascript/randomNumber.js)

---

### selectElement

```javascript
// Physically select a text/image of a element

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

---

### sortElements

```javascript
// Sort a list of node

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

---

### wait

```javascript
// Wait for sometime...

const wait = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
```

Source: [wait.js](/snippets/javascript/wait.js)