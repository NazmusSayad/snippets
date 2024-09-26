import fs from 'fs'
import path from 'path'
import config from './config'
import { cleanDir } from './utils'
import generateMd from './generateMd'
import readSnippets from './readSnippets'

cleanDir(config.markdownPath)
const snippets = readSnippets()
for (const lang in snippets) {
  console.log(`Generating snippets for ${lang}...`)
  const markdownContent = generateMd(lang, snippets[lang])
  fs.writeFileSync(
    path.join(config.markdownPath, lang + '.md'),
    markdownContent
  )
}
