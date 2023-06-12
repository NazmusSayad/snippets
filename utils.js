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
  const headingMatch = string.match(/^\/\/ ?(?<heading>.*)/)
  const heading = headingMatch ? headingMatch.groups.heading.trim() : ''

  const codesMatch = string.match(/(\/\/.*\n)?(\/\/.*\n)?(?<codes>(.|\n)*)/)
  const codes = codesMatch ? codesMatch.groups.codes.trim() : ''

  const descriptionMatch = string.match(/^\/\/.*\n\/\/ ?(?<description>.*)/)
  const description = descriptionMatch
    ? descriptionMatch.groups.description.trim()
    : ''

  return { heading, description, codes }
}
