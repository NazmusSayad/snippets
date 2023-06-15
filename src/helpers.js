import * as path from 'path'
import getRegex, { getRelative } from './config.js'
import { Code, Demo, SuperString } from './UtilClasses.js'
import { isValidText } from './utils.js'

export function extractCode(code, ext) {
  let headingText = ''
  const contents = []
  const currentCodeLines = []

  function pushCurrentCodeLines() {
    if (currentCodeLines.length) {
      contents.push(new Code(currentCodeLines))
      currentCodeLines.length = 0
    }
  }

  const [spliterRegex, metaRegex] = getRegex(ext)
  const [main, demoText] = code.split(spliterRegex)

  main.split('\n').forEach((line) => {
    const match = line.match(metaRegex)
    const { heading, description } = match?.groups ?? {}

    if (isValidText(heading)) {
      return (headingText = heading)
    }

    if (isValidText(description)) {
      pushCurrentCodeLines()
      return contents.push(new SuperString(description))
    }

    currentCodeLines.push(line)
  })

  // Do not forget about this
  // If there is any code left then this will do the work
  pushCurrentCodeLines()

  return {
    heading: headingText.trim(),
    demo: new Demo(demoText),
    contents,
  }
}

export function generateContent({ heading, contents, demo, ext, src }) {
  return [
    `## ${heading || path.parse(src).name} [🔗](/${getRelative(src)})`,

    ...contents.map((content) => content.getString(ext)),

    demo.getString(ext),
  ]
    .filter(Boolean)
    .join('\n\n')
}
