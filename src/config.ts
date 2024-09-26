import path from 'path'
const rootPath = path.join(__dirname, '..')

export default {
  rootPath,
  snippetsPath: path.join(rootPath, 'snippets'),
  markdownPath: path.join(rootPath, 'markdown'),
  extensionPath: path.join(rootPath, 'extension'),
  extensionPackagePath: path.join(rootPath, 'package-ext.json'),
  extensionSnippetsPath: path.join(rootPath, 'extension', 'snippets'),
} as const
