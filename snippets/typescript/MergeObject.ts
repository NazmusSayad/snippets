export type Merge<T extends object, U extends object> = {
  [Key in keyof T | keyof U]: Key extends keyof U
    ? U[Key]
    : Key extends keyof T
    ? T[Key]
    : never
}
