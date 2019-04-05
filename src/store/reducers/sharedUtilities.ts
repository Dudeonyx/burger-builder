export function isValidDecreaseAction<I extends { [x: string]: number }>(
  obj: I | null,
  key: keyof I,
): obj is I {
  return obj && key in obj && typeof obj[key] === 'number' && obj[key] > 0 ? true : false;
}
export function isValidIncreaseAction<I extends { [x: string]: number }>(
  obj: I | null,
  key: keyof I,
): obj is I {
  return obj && key in obj && typeof obj[key] === 'number' ? true : false;
}

export function decrementKeyInObj<I extends { [x: string]: any }>(obj: I | null, key: keyof I) {
  if (isValidDecreaseAction(obj, key)) {
    return {
      ...obj,
      [key]: obj[key] - 1,
    };
  }
  return obj;
}
export function incrementKeyInObj<I extends { [x: string]: number }>(obj: I | null, key: keyof I) {
  if (isValidIncreaseAction(obj, key)) {
    return {
      ...obj,
      [key]: obj[key] + 1,
    };
  }
  return obj;
}
