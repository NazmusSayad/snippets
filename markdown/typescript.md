### Prettify.ts

```typescript
type Prettify<T extends object> = {
  [Key in keyof T]: T[Key]
} & {}
```

Source: [Prettify.ts](/snippets/typescript/Prettify.ts)

---

### RequiredAndNotNull.ts

```typescript
[object Object]

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

Source: [RequiredAndNotNull.ts](/snippets/typescript/RequiredAndNotNull.ts)