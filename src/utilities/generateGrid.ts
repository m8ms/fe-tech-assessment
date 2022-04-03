const generateArray = <T>(length: number, generator: (index: number) => T): Array<T> => {
  return new Array(length)
    .fill(null)
    .map((__, i) => generator(i));
}

export const generateGrid = <T>(
  width: number,
  height: number,
  generator: (y: number, x: number) => T
): Array<T[]> => {
  return generateArray<T[]>(width, (y) => {
    return generateArray<T>(height, (x) => generator(y, x));
  });
}
