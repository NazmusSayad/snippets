import fs from 'fs'
import path from 'path'
import config from './config'
import { ParsedFileOutput } from './types.t'

export default function () {
  const snippetsLanguages = fs.readdirSync(config.snippetsPath).map((file) => {
    return [file, parseLanguageFolder(path.join(config.snippetsPath, file))]
  })

  return Object.fromEntries(snippetsLanguages) as Record<
    string,
    ParsedFileOutput[]
  >
}

function parseLanguageFolder(folderPath: string) {
  return fs
    .readdirSync(folderPath)
    .map((file) => parseFile(path.join(folderPath, file)))
}

function parseFile(filePath: string): ParsedFileOutput {
  const [mainContent] = fs.readFileSync(filePath, 'utf8').split('//# DEMO')
  const [importPaths, simplifiedContent] = getImportPaths(mainContent)
  const getFiles = importPaths.map((importPath) => {
    const fileName = path.join(path.dirname(filePath), importPath + '.ts')
    return parseFile(fileName)
  })

  return {
    filePath: filePath,
    fileName: path.basename(filePath),
    content: [getFiles.join('\n'), simplifiedContent].join('\n\n').trim(),
  }
}

const regex = /import(\s+)?(('(?<path>[^']+)')|("(?<path2>[^']+)"))/gm
function getImportPaths(content: string) {
  const result = []
  const importMatches = content.matchAll(regex)
  for (const match of importMatches) {
    result.push(match.groups.path || match.groups.path2)
  }

  const simplifiedContent = content.replaceAll(regex, '').trim()
  return [result, simplifiedContent] as const
}
