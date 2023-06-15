
export const createElementFromStr1 = (body = '<div></div>') => {
  return new DOMParser().parseFromString(body, 'text/html').body
    .firstElementChild
}


Hello center


export const createElementFromStr2 = (body) => {
  const element = document.createElement('template')
  element.innerHTML = body
  return element.content
}


Hello middle


export const createElementFromStr3 = (body) => {
  const element = document.createElement('template')
  element.innerHTML = body
  return element.content.firstElementChild
}


Hello - last

