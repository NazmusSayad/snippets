import * as fs from 'fs'
import * as path from 'path'

export const srcDir = path.resolve('./src')
export const outputDir = path.resolve('./snippets')
export const languages = fs.readdirSync(srcDir)

// Initilize:
if (fs.existsSync(outputDir))
  fs.rmSync(outputDir, { force: true, recursive: true })
fs.mkdirSync(outputDir, { recursive: true })
