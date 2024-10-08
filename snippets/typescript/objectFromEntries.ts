// Object from entries

import './EntriesToObject'

function objectFromEntries<E extends Entries>(a: E) {
  return Object.fromEntries(a) as EntriesToObject<E>
}

//#DEMO:
const entries = [
  ['name', 'hello'],
  ['name1', 'hello2'],
] as const

const result = objectFromEntries(entries)
result.name // 'hello'
result.name1 // 'hello2'
