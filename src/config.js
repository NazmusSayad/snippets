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

export const hashDemoStr = /^# DEMO:\n/m
export const hashRegex = /(^## (?<heading>.*))|(^#\/ (?<description>.*))/

export const slashDemoStr = /^\/\/ DEMO:\n/m
export const slashRegex = /(^\/\/# (?<heading>.*))|(^\/\/\/ (?<description>.*))/

export const dangerousTextRegex =
  /^(#|```|---|<[a-zA-Z0-9-_]{0,} {0,}\/?>|<\/[a-zA-Z0-9-_]{0,} {0,}>)/gim

export const hashCommentLangs = new Set([
  'py',
  'pl',
  'rb',
  'sh',
  'ps1',
  'r',
  'jl',
  'hx',
  'pp',
  'ahk',
  'ex',
  'hack',
  'fs',
  'elm',
])

export const slashCommentLangs = new Set([
  'c',
  'cs',
  'cpp',
  'java',
  'scala',
  'rs',
  'go',
  'php',
  'groovy',
  'dart',
  'swift',
  'kt',

  // JS & TS :)
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
])

export const supportedExtensions = [...slashCommentLangs, ...hashCommentLangs]
export default function getRegex(ext) {
  if (hashCommentLangs.has(ext)) return [hashDemoStr, hashRegex]
  if (slashCommentLangs.has(ext)) return [slashDemoStr, slashRegex]
  throw new Error(
    `'${ext}' file isn't available right now, you can contact the owner to enable it.`
  )
}
