import './init.js'
import * as fs from 'fs'
import * as path from 'path'
import { writeReadme } from './readme.js'
import { extractCode, writeFile } from './main.js'
import { supportedExtensions } from './get-regex.js'
import { srcDir, outputDir, languages, getRelative } from './config.js'

// Main
languages.forEach((name) => {
  const langDir = path.join(srcDir, name)
  const files = fs.readdirSync(langDir)

  const body = files.map((file) => {
    const filePath = path.join(langDir, file)
    const fileData = fs.readFileSync(filePath, 'utf-8')
    const ext = path.extname(file).slice(1).toLowerCase()
    return { ...extractCode(fileData, ext), src: filePath }
  })

  writeFile(name, body)
})

// Readme
;(() => {
  const SUPPORTED_LANGUAGES = supportedExtensions
    .map((ext) => `- .${ext}`)
    .join('\n')

  const LANGUAGES = languages
    .map((lang) => {
      const url = `/${getRelative(outputDir)}/${lang}.md`
      return `- [${lang}](${url})`
    })
    .join('\n')

  writeReadme(LANGUAGES, SUPPORTED_LANGUAGES)
})()
