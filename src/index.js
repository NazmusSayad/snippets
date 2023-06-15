import './init.js'
import {
  srcDir,
  outputDir,
  languages,
  getRelative,
  supportedExtensions,
} from './config.js'
import * as fs from 'fs'
import * as path from 'path'
import { generateContent, extractCode } from './helpers.js'
import { writeMainFile, writeReadmeFile } from './utils.js'

// Main
languages.forEach((name) => {
  const langDir = path.join(srcDir, name)
  const files = fs.readdirSync(langDir)

  const contentsData = files.map((file) => {
    const filePath = path.join(langDir, file)
    const fileData = fs.readFileSync(filePath, 'utf-8')
    const ext = path.extname(file).slice(1).toLowerCase()
    return { ...extractCode(fileData, ext), ext, src: filePath }
  })

  const contents = contentsData.map(generateContent)

  writeMainFile(name, contents)
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

  writeReadmeFile(LANGUAGES, SUPPORTED_LANGUAGES)
})()
