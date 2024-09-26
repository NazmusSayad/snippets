import path from 'path'
const rootPath = path.join(__dirname, '..')

export default {
  rootPath,
  snippetsPath: path.join(rootPath, 'snippets'),
  markdownPath: path.join(rootPath, 'markdown'),
  extensionPath: path.join(rootPath, 'dist-extension'),
  extensionSnippetsPath: path.join(rootPath, 'dist-extension', 'snippets'),
  extensionPackagePath: path.join(rootPath, 'package-ext.json'),
} as const
