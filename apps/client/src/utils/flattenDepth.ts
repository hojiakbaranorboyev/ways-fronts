function flattenDepth<T>(arr: any): T[] {
  const flatArr: T[] = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      flatArr.push(...item);
    } else {
      flatArr.push(item);
    }
  }
  return flatArr;
}
export default flattenDepth;
