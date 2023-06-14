import {
  hashRegex,
  slashRegex,
  hashCommentLangs,
  slashCommentLangs,
} from './config.js'

const map = {}

setRegex(slashRegex, slashCommentLangs)
setRegex(hashRegex, hashCommentLangs)

function setRegex(regex, extensions) {
  extensions.forEach((ext) => {
    map[ext] = regex
  })
}

export const supportedExtensions = Object.keys(map)
export default function (ext) {
  const regex = map[ext]
  if (regex) return regex

  throw new Error(
    `'${ext}' file isn't available right now, you can contact the owner to enable it.`
  )
}
