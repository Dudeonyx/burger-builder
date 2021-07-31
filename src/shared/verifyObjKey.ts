export function verifyObjKey<T extends Record<string, any>>(
  obj: T,
  key: string | number | symbol
): key is keyof T {
  return Object.hasOwnProperty.call(obj, key);
}
