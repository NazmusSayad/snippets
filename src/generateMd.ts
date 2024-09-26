import path from 'path'
import { ParsedFileOutput } from './types.t'
import config from './config'

function generateMd(
  lang: string,
  { fileName, filePath, content }: ParsedFileOutput
) {
  const header = `### ${fileName}`
  const body = ['```' + lang, content, '```'].join('\n')
  const source = `Source: [${fileName}](/${path
    .relative(config.rootPath, filePath)
    .replaceAll('\\', '/')})`

  return [header, body, source].join('\n\n')
}

export default function (lang: string, contents: ParsedFileOutput[]) {
  return contents.map((parsed) => generateMd(lang, parsed)).join('\n\n---\n\n')
}
