// Create object from Entries type

export type EntriesToObject<T extends [string, any][]> = {
  [K in T[number][0]]: Extract<T[number], [K, any]>[1]
}
