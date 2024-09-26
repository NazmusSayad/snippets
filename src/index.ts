import fs from 'fs'
import path from 'path'
import config from './config'
import { cleanDir } from './utils'
import readSnippets from './readSnippets'
import generateMd from './generateMd'

cleanDir(config.markdownPath)
const snippets = readSnippets()
for (const lang in snippets) {
  const markdownContent = generateMd(lang, snippets[lang])
  fs.writeFileSync(
    path.join(config.markdownPath, lang + '.md'),
    markdownContent
  )
}
