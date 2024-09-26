### Prettify

```typescript
// Prettify<T> - Removes readonly, optional, and nullable from object properties

type Prettify<T extends object> = {
  [Key in keyof T]: T[Key]
} & {}
```

Source: [Prettify.ts](/snippets/typescript/Prettify.ts)

---

### RequiredAndNotNull

```typescript
// Prettify<T> - Removes readonly, optional, and nullable from object properties

type Prettify<T extends object> = {
  [Key in keyof T]: T[Key]
} & {}

type RequiredAndNotNull<T extends object, R = false> = Prettify<
  Required<{
    [key in keyof T]: R extends false
      ? Exclude<T[key], null | undefined>
      : T[key] extends object
      ? RequiredAndNotNull<T[key], true>
      : Exclude<T[key], null | undefined>
  }>
>
```

#### Demo:

```typescript
type User = {
  name: string
  age: number | null
  address: {
    street: string
    city: string | null
  } | null
}

type RequiredUser = RequiredAndNotNull<User>
```

Source: [RequiredAndNotNull.ts](/snippets/typescript/RequiredAndNotNull.ts)