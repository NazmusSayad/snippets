import * as fs from 'fs'
import * as path from 'path'
import { isValidText } from './utils.js'
import { Code, Demo, SuperString } from './SuperString.js'
import getRegex, { snippetsDir, languages, getRelative } from './config.js'

export function getContentData() {
  return languages.map((name) => {
    const langDir = path.join(snippetsDir, name)
    const files = fs.readdirSync(langDir)

    const filesData = files.map((file) => {
      const filePath = path.join(langDir, file)
      const fileData = fs.readFileSync(filePath, 'utf-8')
      const ext = path.extname(file).slice(1).toLowerCase()
      return {
        ext,
        src: filePath,
        ...extractCode(fileData, ext),
      }
    })

    return { name, files: filesData }
  })
}

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
  const parsedPath = path.parse(src)
  
  return [
    `## ${heading || parsedPath.name}`,
    `src: [${parsedPath.base}](/${getRelative(src)})`,
    ...contents.map((content) => content.getString(ext)),
    demo.getString(ext),
  ]
    .filter(Boolean)
    .join('\n')
}
