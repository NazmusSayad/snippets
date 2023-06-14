//# Create object from Entries type

/// Hello this is how we do this
/// Hello this is how we do this
/// Hello this is how we do this
/// Hello this is how we do this

export type Entries =
  | [string, any][]
  | readonly [string, any][]
  | (readonly [string, any])[]
  | readonly (readonly [string, any])[]

export type EntriesToObject<T extends Entries> = {
  [K in T[number] as K[0]]: K[1]
}
