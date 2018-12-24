export const verifyObjKey = <T extends {}>(
  obj: T,
  key: string | number | symbol,
): key is keyof T => {
  return key in obj;
};
