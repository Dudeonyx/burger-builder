export function verifyObjKey<T extends {}>(
  obj: T,
  key: string | number | symbol,
): key is keyof T {
  return obj.hasOwnProperty(key);
}
