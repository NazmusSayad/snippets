import fs from 'fs'
import path from 'path'
import config from './config'
import { cleanDir } from './utils'
import { getExtVersion } from './vsce'
import generateExt from './generateExt'
import readSnippets from './readSnippets'

cleanDir(config.extensionSnippetsPath)

const extensionPackage = JSON.parse(
  fs.readFileSync(config.extensionPackagePath, 'utf-8')
)

const snippets = readSnippets()
for (const lang in snippets) {
  console.log(`Generating extension for ${lang}...`)
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

// Make extension files...
;(async () => {
  const version = await getExtVersion('NazmusSayad', 'util-snippets')
  const newVersion = version.replace(/\d+$/, (match) =>
    String(Number(match) + 1)
  )

  extensionPackage.version = newVersion
  console.log(`Updating extension version to ${newVersion}...`)

  fs.writeFileSync(
    path.join(config.extensionPath, 'package.json'),
    JSON.stringify(extensionPackage, null, 2)
  )

  fs.copyFileSync(
    path.join(config.rootPath, 'README.md'),
    path.join(config.extensionPath, 'README.md')
  )

  fs.copyFileSync(
    path.join(config.rootPath, 'LICENSE.md'),
    path.join(config.extensionPath, 'LICENSE.md')
  )
})()
