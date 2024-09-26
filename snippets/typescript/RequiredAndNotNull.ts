import { Prettify } from "./Prettify";

export type RequiredAndNotNull<T extends object, R = false> = Prettify<
  Required<{
    [key in keyof T]: R extends false
      ? Exclude<T[key], null | undefined>
      : T[key] extends object
      ? RequiredAndNotNull<T[key], true>
      : Exclude<T[key], null | undefined>;
  }>
>;
