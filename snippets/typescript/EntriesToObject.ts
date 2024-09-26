// Create object from Entries type

type Entries =
  | [string, any][]
  | readonly [string, any][]
  | (readonly [string, any])[]
  | readonly (readonly [string, any])[]

type EntriesToObject<T extends Entries> = {
  [K in T[number] as K[0]]: K[1]
}
