## Create object from Entries type

```ts
export type EntriesToObject<T extends [string, any][]> = {
  [K in T[number][0]]: Extract<T[number], [K, any]>[1]
}
```

<br />

## Object from entries

```ts
type Entries = [string, any][]
type ReadOnlyEntries = readonly (readonly [string, any])[]

type ConvertedType<T extends Entries> = {
  [K in T[number][0]]: Extract<T[number], [K, any]>[1]
}

type RemoveReadonlyCore<T> = {
  -readonly [K in keyof T]: T[K]
}
type RemoveReadonly<T> = {
  -readonly [K in keyof T]: RemoveReadonlyCore<T[K]>
}

// Test:
const entries = [
  ['name', 'hello'],
  ['name1', 'hello'],
] as const

function objectFromEntries<E extends Entries | ReadOnlyEntries>(a: E) {
  return Object.fromEntries(a) as ConvertedType<
    E extends ReadOnlyEntries ? RemoveReadonly<E> : E
  >
}
```