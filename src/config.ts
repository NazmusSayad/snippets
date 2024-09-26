import path from 'path'
const rootPath = path.join(__dirname, '..')

export default {
  rootPath,
  packagePath: path.join(rootPath, 'package'),
  snippetsPath: path.join(rootPath, 'snippets'),
  markdownPath: path.join(rootPath, 'markdown'),
} as const
