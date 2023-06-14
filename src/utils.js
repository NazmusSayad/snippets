import * as fs from 'fs'
import * as path from 'path'
import { outputDir, readmePath, readmeTemplate } from './config.js'

export function writeMainFile(name, contents) {
  const markdown = contents.join('\n\n<hr /><br />\n\n')
  fs.writeFileSync(path.join(outputDir, name + '.md'), markdown)
}

export function isValidText(string) {
  if (!string) return false
  return !/^(#|```)/gm.test(string.trim())
}

export function generateMdCode(ext, codes) {
  return '```' + ext + '\n' + codes.trim() + '\n```'
}

export function writeReadmeFile(LANGUAGES, SUPPORTED_LANGUAGES) {
  fs.writeFileSync(
    readmePath,
    readmeTemplate
      .replace('{LANGUAGES}', LANGUAGES)
      .replace('{SUPPORTED_LANGUAGES}', SUPPORTED_LANGUAGES)
  )
}
