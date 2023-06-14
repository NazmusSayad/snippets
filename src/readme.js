import * as fs from 'fs'
import { getRelative, outputDir, readmePath, readmeTemplate } from './config.js'

export function writeReadme(LANGUAGES, SUPPORTED_LANGUAGES) {
  fs.writeFileSync(
    readmePath,
    readmeTemplate
      .replace('{LANGUAGES}', LANGUAGES)
      .replace('{SUPPORTED_LANGUAGES}', SUPPORTED_LANGUAGES)
  )
}
