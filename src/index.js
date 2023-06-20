import './init.js'
import {
  outputDir,
  languages,
  getRelative,
  supportedExtensions,
} from './config.js'
import { generateContent, getContentData } from './helpers.js'
import { writeMainFile, writeReadmeFile } from './utils.js'

getContentData().forEach(({ name, files }) => {
  writeMainFile(name, files.map(generateContent))
})

// Main

// Readme
;() => {
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
}
