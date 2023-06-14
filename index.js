import * as fs from 'fs'
import * as path from 'path'
import {
  languages,
  srcDir,
  outputDir,
  readmeTemplate,
  readme,
} from './config.js'

console.log(process.env)

const details = languages.map((name) => {
  const langDir = path.join(srcDir, name)
  const files = fs.readdirSync(langDir)

  const body = files.map((file) => {
    const fileData = fs.readFileSync(path.join(langDir, file), 'utf-8')
    return { ...extractSections(fileData), ext: path.extname(file).slice(1) }
  })

  return { name, body }
})

details.forEach((detail) => writeFile(detail))
writeReadme(
  languages
    .map((lang) => {
      const url = `./${path.relative('.', outputDir)}/${lang}.md`
      return `- [${lang}](${url})`
    })
    .join('\n')
)

// SRC:
function addCode(ext, codes) {
  return '```' + ext + '\n' + codes.trim() + '\n```'
}

function writeFile({ name, body }) {
  const markdownParts = body.map(({ heading, description, codes, demo, ext }) =>
    [
      '## ' + heading,
      description,
      addCode(ext, codes),
      demo && `***DEMO:***`,
      demo && addCode(ext, demo),
    ]
      .filter(Boolean)
      .join('\n\n')
  )
  const markdown = markdownParts.join('\n\n<br />\n\n')
  fs.writeFileSync(path.join(outputDir, name + '.md'), markdown)
}

function writeReadme(langs) {
  const template = fs.readFileSync(readmeTemplate, 'utf-8')
  const newStr = template.replace('{LANGUAGES}', langs)
  fs.writeFileSync(readme, newStr)
}

function extractSections(string) {
  let headingText = ''
  let descriptionText = ''
  const codeLines = []

  const [main, demo] = string.split('// DEMO:')

  main.split('\n').forEach((line) => {
    const match = line.match(
      /(^\/\/# (?<heading>.*))|(^\/\/## (?<description>.*))/
    )

    const heading = match?.groups?.heading
    if (heading) {
      return (headingText = heading)
    }

    const description = match?.groups?.description
    if (description) {
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
