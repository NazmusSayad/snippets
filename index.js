import * as fs from 'fs'
import * as path from 'path'
import * as ls from 'lskit'
import langs from './langs.js'
import { groupBy, extractSections } from './utils.js'

const files = ls.sync('./src')
const data = files.map((file) => {
  const fileStr = fs.readFileSync(file, 'utf-8')
  const ext = path.extname(file).slice(1)

  return { ext, ...extractSections(fileStr) }
})

groupBy(data, (d) => d.ext).map(([ext, body]) => {
  const name = langs[ext]

  const markdownBody = body.map(({ heading, description, codes }) => {
    const content = '```' + ext + '\n' + codes.trim() + '\n```'
    return ['## ' + heading, description, content].filter(Boolean).join('\n\n')
  })

  fs.writeFileSync('./build/' + name + '.md', markdownBody.join('\n\n'))
})
