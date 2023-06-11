export function getHeading(string) {
  const firstLineComment = string.match(/\/\/(.*)/)

  if (firstLineComment && firstLineComment.length > 1) {
    const comment = firstLineComment[1].trim()
    return comment
  }

  return ''
}

export function getDescription(string) {
  const multilineComment = string.match(/\/\*(.*?)\*\//s)

  if (multilineComment && multilineComment.length > 1) {
    const commentContent = multilineComment[1].trim()
    return commentContent
  }

  return ' '
}

export function getContent(string) {
  const multilineComment =
    string.match(/export default (?<default>.*)|export (?<export>.*)/gm) ?? []

  return multilineComment.map((str) => {
    return str.replace(/^export( default)?\s+/, '')
  })
}

export function groupBy(array, keySelector) {
  return Object.entries(
    array.reduce((result, item) => {
      const key = keySelector(item)

      if (!result[key]) {
        result[key] = []
      }

      result[key].push(item)

      return result
    }, {})
  )
}
