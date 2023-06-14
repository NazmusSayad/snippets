//# You can create DOM element from string

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
