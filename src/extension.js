import * as fs from 'fs'
import * as path from 'path'
import { getContentData } from './helpers.js'
import { Code } from './SuperString.js'
import { extDir, extPkgJSON, extSnippetsDir } from './config.js'

const meta = getContentData().map(({ name, files }) => {
  const languageScope = name
  const snippets = {}

  files.forEach(({ src, heading, contents }) => {
    const fileBasename = path.parse(src).name
    snippets[heading || fileBasename] = {
      prefix: fileBasename,
      scope: languageScope,
      body: contents
        .filter((a) => a instanceof Code)
        .join('\n\n')
        .replace(/  /gim, '\t'),
    }
  })

  const filePath = path.join(extSnippetsDir, `${name}.code-snippets`)
  fs.writeFileSync(filePath, JSON.stringify(snippets))

  return {
    language: languageScope,
    path: './' + path.relative(extDir, filePath),
  }
})

const pkgData = JSON.parse(fs.readFileSync(extPkgJSON, 'utf-8'))
pkgData.contributes.snippets = meta
fs.writeFileSync(extPkgJSON, JSON.stringify(pkgData))
