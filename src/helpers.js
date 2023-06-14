import getRegex, { getRelative } from './config.js'
import { generateMdCode, isValidText } from './utils.js'

export function extractCode(code, ext) {
  let headingText = ''
  const descriptionTexts = []
  const codeLines = []

  const [spliterRegex, metaRegex] = getRegex(ext)
  const [main, demo] = code.split(spliterRegex)

  main.split('\n').forEach((line) => {
    const match = line.match(metaRegex)

    const { heading, description } = match?.groups ?? {}

    if (isValidText(heading)) {
      return (headingText = heading)
    }

    if (isValidText(description)) {
      return descriptionTexts.push(description)
    }

    codeLines.push(line)
  })

  return {
    ext,
    heading: headingText.trim(),
    description: descriptionTexts.join('\n\n').trim(),
    codes: codeLines.join('\n').trim(),
    demo: demo?.trim(),
  }
}

export function generateContent({
  heading,
  description,
  codes,
  demo,
  ext,
  src,
}) {
  if (!heading) {
    throw new Error(`No heading found at'${src}'`)
  }
  
  return [
    `## ${heading} [🔗](/${getRelative(src)})`,
    description,
    generateMdCode(ext, codes),
    demo && `***DEMO:***`,
    demo && generateMdCode(ext, demo),
  ]
    .filter(Boolean)
    .join('\n\n')
}
