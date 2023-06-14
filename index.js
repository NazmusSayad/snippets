import * as fs from 'fs'
import * as path from 'path'
import langs from './langs.js'
import { groupBy, extractSections, addCode } from './utils.js'

const srcDir = path.resolve('./src')
const outputDir = path.resolve('./snippets')

const files = fs.readdirSync(srcDir).map((file) => {
  return path.join(srcDir, file)
})

const data = files.map((file) => {
  const fileStr = fs.readFileSync(file, 'utf-8')
  const ext = path.extname(file).slice(1)

  return { ext, ...extractSections(fileStr) }
})

groupBy(data, (d) => d.ext).map(([ext, body]) => {
  const name = langs[ext]

  const markdownBody = body.map(({ heading, description, codes, demo }) => {
    return [
      '## # ' + heading,
      description,
      addCode(ext, codes),
      demo && `### ***DEMO:***`,
      demo && addCode(ext, demo),
    ]
      .filter(Boolean)
      .join('\n\n')
  })

  fs.writeFileSync(
    path.join(outputDir, name + '.md'),
    markdownBody.join('\n\n<br />\n\n')
  )
})
