import * as fs from 'fs'
import * as path from 'path'

export const baseDir = path.resolve('.')
export const srcDir = path.join(baseDir, './snippets')
export const outputDir = path.join(baseDir, './markdown')
export const readmePath = path.join(baseDir, './README.md')
export const readmeTemplatePath = path.join(baseDir, './src/README.template.md')

export function getRelative(target) {
  return path.relative(baseDir, target)
}

export const languages = fs.readdirSync(srcDir)
export const readmeTemplate = fs.readFileSync(readmeTemplatePath, 'utf-8')

export const hashRegex = /(^## (?<heading>.*))|(^#\/ (?<description>.*))/
export const slashRegex = /(^\/\/# (?<heading>.*))|(^\/\/\/ (?<description>.*))/

export const hashCommentLangs = ['py', 'sh']
export const slashCommentLangs = [
  'js',
  'ts',
  'jsx',
  'tsx',
  'mjs',
  'cjs',
  'cjsx',
  'mjsx',
  'cts',
  'mts',
  'ctsx',
  'mtsx',
]
