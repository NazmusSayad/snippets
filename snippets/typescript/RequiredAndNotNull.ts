import './Prettify'

type RequiredAndNotNull<T extends object, R = false> = Prettify<
  Required<{
    [key in keyof T]: R extends false
      ? Exclude<T[key], null | undefined>
      : T[key] extends object
      ? RequiredAndNotNull<T[key], true>
      : Exclude<T[key], null | undefined>
  }>
>

//# DEMO

type User = {
  name: string
  age: number | null
  address: {
    street: string
    city: string | null
  } | null
}

type RequiredUser = RequiredAndNotNull<User>
