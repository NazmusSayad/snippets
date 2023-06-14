// Create object from Entries type

export type EntriesToObject<T extends [string, any][]> = {
  [K in T[number][0]]: Extract<T[number], [K, any]>[1]
}

export type EntriesToObject<T extends [string, any][]> = {
  [K in T[number] as K[0]]: K[1]
}
