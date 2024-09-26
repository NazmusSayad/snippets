type Modify<Type extends object, PartialType extends Partial<Type>> = Omit<
  Type,
  keyof PartialType
> &
  PartialType
