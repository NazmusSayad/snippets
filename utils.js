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

export function extractSections(string) {
  const codeLines = []
  let headingText = ''
  let descriptionText = ''

  const [main, demo] = string.split('//###')

  main.split('\n').forEach((line) => {
    const headingMatch = line.match(/^\/\/# (?<content>.*)/)
    const heading = headingMatch && headingMatch.groups.content.trim()
    if (heading !== null) {
      return (headingText = heading)
    }

    const descriptionMatch = line.match(/^\/\/## (?<content>.*)/)
    const description =
      descriptionMatch && descriptionMatch.groups.content.trim()
    if (description !== null) {
      return (descriptionText = description)
    }

    codeLines.push(line)
  })

  return {
    heading: headingText.trim(),
    description: descriptionText.trim(),
    codes: codeLines.join('\n').trim(),
    demo: demo?.trim(),
  }
}

export function addCode(ext, codes) {
  return '```' + ext + '\n' + codes.trim() + '\n```'
}
