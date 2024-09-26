// Prettify<T> - Removes readonly, optional, and nullable from object properties

type Prettify<T extends object> = {
  [Key in keyof T]: T[Key]
} & {}
