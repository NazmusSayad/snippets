import {
  outputDir,
  readmePath,
  readmeTemplate,
  dangerousTextRegex,
} from './config.js'
import * as fs from 'fs'
import * as path from 'path'

export function writeMainFile(name, contents) {
  const markdown = contents.join('\n\n<hr /><br />\n\n')
  fs.writeFileSync(path.join(outputDir, name + '.md'), markdown)
}

export function isValidText(string) {
  if (!string) return false
  return !dangerousTextRegex.test(string.trim())
}

export function writeReadmeFile(LANGUAGES, SUPPORTED_LANGUAGES) {
  fs.writeFileSync(
    readmePath,
    readmeTemplate
      .replace('{LANGUAGES}', LANGUAGES)
      .replace('{SUPPORTED_LANGUAGES}', SUPPORTED_LANGUAGES)
  )
}
