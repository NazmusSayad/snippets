import path from 'path'
const rootPath = path.join(__dirname, '..')

export default {
  rootPath,
  snippetsPath: path.join(rootPath, 'snippets'),
  markdownPath: path.join(rootPath, 'markdown'),
  extensionPath: path.join(rootPath, 'extension'),
  extensionSnippetsPath: path.join(rootPath, 'extension', 'snippets'),
} as const
