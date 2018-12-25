import { isDraft } from 'immer';

export function decrementKeyInObj<I extends { [x: string]: any }>(
  obj: I | null,
  key: keyof I,
) {
  if (isValidDecreaseAction(obj, key)) {
    if (isDraft(obj)) {
      (obj[key] as any) -= 1;
      return obj;
    } else {
      const newObj = {
        ...obj,
        [key]: obj[key] + 1,
      };
      return newObj;
    }
  }
  return obj;
}
export function isValidDecreaseAction<I extends { [x: string]: number }>(
  obj: I | null,
  key: keyof I,
): obj is I {
  return obj && key in obj && typeof obj[key] === 'number' && obj[key] > 0
    ? true
    : false;
}
export function incrementKeyInObj<I extends { [x: string]: any }>(
  obj: I | null,
  key: keyof I,
) {
  if (isValidIncreaseAction(obj, key)) {
    if (isDraft(obj)) {
      (obj[key] as any) += 1;
      return obj;
    } else {
      const newObj = {
        ...obj,
        [key]: obj[key] + 1,
      };
      return newObj;
    }
  }
  return obj;
}
export function isValidIncreaseAction<I extends { [x: string]: number }>(
  obj: I | null,
  key: keyof I,
): obj is I {
  return obj && key in obj && typeof obj[key] === 'number' ? true : false;
}
