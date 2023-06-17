type Prettify<T extends object> = {
  [Key in keyof T]: T[Key];
} & {};

export default Prettify;
