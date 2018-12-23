export function assertActionIsNever(x: never): never {
  throw new Error('Unexpected action: ' + x);
}
