import path from 'path'
import config from './config'
import { ParsedFileOutput } from './types.t'

function generateMd(
  lang: string,
  { fileName, filePath, content, demoContent }: ParsedFileOutput
) {
  const header = `### ${path.parse(fileName).name}`
  const body = ['```' + lang, content, '```'].join('\n')

  const demo =
    demoContent &&
    ['#### Demo:', ['```' + lang, demoContent, '```'].join('\n')].join('\n\n')

  const source = `Source: [${fileName}](/${path
    .relative(config.rootPath, filePath)
    .replaceAll('\\', '/')})`

  return [header, body, demo, source].filter(Boolean).join('\n\n')
}

export default function (lang: string, contents: ParsedFileOutput[]) {
  return contents.map((parsed) => generateMd(lang, parsed)).join('\n\n---\n\n')
}
