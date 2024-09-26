// You can create DOM element from string

function createElementFromStr1(body = '<div></div>') {
  return new DOMParser().parseFromString(body, 'text/html').body
    .firstElementChild
}

function createElementFromStr2(body) {
  const element = document.createElement('template')
  element.innerHTML = body
  return element.content
}

function createElementFromStr3(body) {
  const element = document.createElement('template')
  element.innerHTML = body
  return element.content.firstElementChild
}
