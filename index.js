import * as fs from 'fs'
import * as path from 'path'
import * as ls from 'lskit'
import langs from './langs.js'
import { getContent, getHeading, getDescription, groupBy } from './utils.js'

const files = ls.sync('./src')
const data = files.map((file) => {
  const fileStr = fs.readFileSync(file, 'utf-8')
  const ext = path.extname(file).slice(1)

  const heading = getHeading(fileStr)
  const description = getDescription(fileStr)
  const content = getContent(fileStr)

  return { ext, heading, description, content }
})

groupBy(data, (d) => d.ext).map(([ext, body]) => {
  const name = langs[ext]

  const markdown = body.map(({ heading, description, content }) => {
    const codes = content.map((code) => {
      return '```' + ext + '\n' + code.trim() + '\n```'
    })
    return ['## ' + heading, description, codes.join('\n\n')].join('\n\n')
  })

  fs.writeFileSync('./build/' + name + '.md', markdown.join('\n\n'))
})
