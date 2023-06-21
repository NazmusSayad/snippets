## DeepMerge
```ts
export type DeepMerge<T, U> = T extends object
  ? U extends object
    ? {
        [K in keyof (T & U)]: K extends keyof U
          ? K extends keyof T
            ? DeepMerge<T[K], U[K]>
            : U[K]
          : K extends keyof T
          ? T[K]
          : never
      }
    : T
  : U
```
Source: [DeepMerge.ts](/snippets/typescript/DeepMerge.ts)

<hr /><br />

## DeepPartial
```ts
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
```
Source: [DeepPartial.ts](/snippets/typescript/DeepPartial.ts)

<hr /><br />

## Create object from Entries type
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
Source: [EntriesToObject.ts](/snippets/typescript/EntriesToObject.ts)

<hr /><br />

## MakeOptional
```ts
type HasUndefined<T> = (T extends undefined ? true : false) extends false
  ? false
  : true

type Prettify<T extends object> = {
  [Key in keyof T]: T[Key]
} & {}
  
export type MakeOptional<TObject> = Prettify<
  {
    [K in keyof TObject as HasUndefined<TObject[K]> extends true
      ? never
      : K]: TObject[K]
  } & {
    [K in keyof TObject as HasUndefined<TObject[K]> extends false
      ? never
      : K]?: TObject[K]
  }
>
```
Source: [MakeOptional.ts](/snippets/typescript/MakeOptional.ts)

<hr /><br />

## Modify
```ts
export type Modify<
  Type extends object,
  PartialType extends Partial<Type>
> = Omit<Type, keyof PartialType> & PartialType;
```
Source: [Modify.ts](/snippets/typescript/Modify.ts)

<hr /><br />

## OmitByValue
```ts
export type OmitByValue<T, ValueType> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends ValueType ? never : K
  }[keyof T]
>
```
Source: [OmitByValue.ts](/snippets/typescript/OmitByValue.ts)

<hr /><br />

## Prettify
```ts
export type Prettify<T extends object> = {
  [Key in keyof T]: T[Key];
} & {};
```
Source: [Prettify.ts](/snippets/typescript/Prettify.ts)

<hr /><br />

## RequireAtLeastOne
```ts
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Omit<
  T,
  Keys
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>
  }[Keys]
```
Source: [RequireAtLeastOne.ts](/snippets/typescript/RequireAtLeastOne.ts)

<hr /><br />

## RequiredAndNotNull
```ts
import { Prettify } from "./Prettify";

export type RequiredAndNotNull<T extends object, R = false> = Prettify<
  Required<{
    [key in keyof T]: R extends false
      ? Exclude<T[key], null | undefined>
      : T[key] extends object
      ? RequiredAndNotNull<T[key], true>
      : Exclude<T[key], null | undefined>;
  }>
>;
```
Source: [RequiredAndNotNull.ts](/snippets/typescript/RequiredAndNotNull.ts)

<hr /><br />

## Object from entries
```ts
import type { Entries, EntriesToObject } from './EntriesToObject'

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
Source: [objectFromEntries.ts](/snippets/typescript/objectFromEntries.ts)