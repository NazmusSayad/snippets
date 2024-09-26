import path from 'path'
import { ParsedFileOutput } from './types.t'

export default function (lang: string, contents: ParsedFileOutput[]) {
  const data = contents.map((parsed) => {
    const prefix = path.parse(parsed.fileName).name

    return [
      prefix,
      {
        prefix,
        scope:
          lang === 'typescript'
            ? 'typescript,typescriptreact'
            : lang === 'javascript'
            ? 'javascript,javascriptreact'
            : lang,
        body: parsed.content,
      },
    ]
  })

  return JSON.stringify(Object.fromEntries(data))
}
