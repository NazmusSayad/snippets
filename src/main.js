import * as fs from 'fs'
import * as path from 'path'
import { getRelative, outputDir } from './config.js'
import getRegex from './get-regex.js'

export function extractCode(code, ext) {
  let headingText = ''
  const descriptionTexts = []
  const codeLines = []

  const [main, demo] = code.split('// DEMO:')
  const regex = getRegex(ext)

  main.split('\n').forEach((line) => {
    const match = line.match(regex)

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

export function writeFile(name, body) {
  const markdownParts = body.map((data) => {
    const { heading, description, codes, demo, ext, src } = data
    return [
      `## ${heading} [🔗](/${getRelative(src)})`,
      description,
      addCode(ext, codes),
      demo && `***DEMO:***`,
      demo && addCode(ext, demo),
    ]
      .filter(Boolean)
      .join('\n\n')
  })

  const markdown = markdownParts.join('\n\n<hr /><br />\n\n')
  fs.writeFileSync(path.join(outputDir, name + '.md'), markdown)
}

export function isValidText(string) {
  if (!string) return false
  return !/^(#|```)/gm.test(string.trim())
}

export function addCode(ext, codes) {
  return '```' + ext + '\n' + codes.trim() + '\n```'
}
