import * as fs from 'fs'
import { outputDir } from './config.js'

if (fs.existsSync(outputDir))
  fs.rmSync(outputDir, { force: true, recursive: true })
fs.mkdirSync(outputDir, { recursive: true })


