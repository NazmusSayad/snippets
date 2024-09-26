export type OmitByValue<T, ValueType> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends ValueType ? never : K
  }[keyof T]
>
