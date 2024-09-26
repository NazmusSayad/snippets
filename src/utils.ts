import fs from 'fs'

export function cleanDir(dir: string, createDir = true) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true })
  }

  if (createDir) {
    fs.mkdirSync(dir, { recursive: true })
  }
}
