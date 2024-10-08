import './Prettify'

type HasUndefined<T> = (T extends undefined ? true : false) extends false
  ? false
  : true

type MakeOptional<TObject> = Prettify<
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
