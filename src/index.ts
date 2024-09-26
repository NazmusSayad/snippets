import fs from 'fs'
import path from 'path'
import config from './config'
import { cleanDir } from './utils'
import generateMd from './generateMd'
import generateExt from './generateExt'
import readSnippets from './readSnippets'

cleanDir(config.markdownPath)
cleanDir(config.extensionSnippetsPath)

const extensionPackage = JSON.parse(
  fs.readFileSync(config.extensionPackagePath, 'utf-8')
)

const snippets = readSnippets()
for (const lang in snippets) {
  const markdownContent = generateMd(lang, snippets[lang])
  fs.writeFileSync(
    path.join(config.markdownPath, lang + '.md'),
    markdownContent
  )

  const extensionContent = generateExt(lang, snippets[lang])
  const extensionPath = path.join(
    config.extensionSnippetsPath,
    lang + '.code-snippets'
  )

  fs.writeFileSync(extensionPath, extensionContent)
  extensionPackage.contributes.snippets.push({
    language:
      lang === 'typescript'
        ? 'typescript,typescriptreact'
        : lang === 'javascript'
        ? 'javascript,javascriptreact'
        : lang,
    path:
      './' +
      path.relative(config.extensionPath, extensionPath).replace(/\\/g, '/'),
  })
}

fs.writeFileSync(
  path.join(config.extensionPath, 'package.json'),
  JSON.stringify(extensionPackage, null, 2)
)

fs.writeFileSync(
  path.join(config.extensionPath, 'README.md'),
  fs.readFileSync(path.join(config.rootPath, 'README.md'), 'utf-8')
)
