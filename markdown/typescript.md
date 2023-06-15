## DeepPartial [🔗](/snippets/typescript/DeepPartial.ts)

```ts
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

<hr /><br />

## Create object from Entries type [🔗](/snippets/typescript/EntriesToObject.ts)

```ts
export type Entries =
  | [string, any][]
  | readonly [string, any][]
  | (readonly [string, any])[]
  | readonly (readonly [string, any])[]

export type EntriesToObject<T extends Entries> = {
  [K in T[number] as K[0]]: K[1]
}
```

<hr /><br />

## OmitByValue [🔗](/snippets/typescript/OmitByValue.ts)

```ts
export type OmitByValue<T, ValueType> = Pick<T, {
  [K in keyof T]: T[K] extends ValueType ? never : K;
}[keyof T]>;
```

<hr /><br />

## RequireAtLeastOne [🔗](/snippets/typescript/RequireAtLeastOne.ts)

```ts
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Omit<T, Keys> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>;
  }[Keys];
```

<hr /><br />

## Object from entries [🔗](/snippets/typescript/objectFromEntries.ts)

```ts
import type { Entries, EntriesToObject } from './entriesToObject'

export function objectFromEntries<E extends Entries>(a: E) {
  return Object.fromEntries(a) as EntriesToObject<E>
}
```

***DEMO:***

```ts
const entries = [
  ['name', 'hello'],
  ['name1', 'hello2'],
] as const

const result = objectFromEntries(entries)
result.name // 'hello'
result.name1 // 'hello2'
```