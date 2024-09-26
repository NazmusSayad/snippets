import fs from 'fs'
import path from 'path'
import config from './config'
import { cleanDir } from './utils'
import readSnippets from './readSnippets'
import generateMd from './generateMd'
import generateExt from './generateExt'

cleanDir(config.markdownPath)
cleanDir(config.extensionSnippetsPath)

const snippets = readSnippets()
for (const lang in snippets) {
  const markdownContent = generateMd(lang, snippets[lang])
  fs.writeFileSync(
    path.join(config.markdownPath, lang + '.md'),
    markdownContent
  )

  const extensionContent = generateExt(lang, snippets[lang])
  fs.writeFileSync(
    path.join(config.extensionSnippetsPath, lang + '.code-snippets'),
    extensionContent
  )
}
