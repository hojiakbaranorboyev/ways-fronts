export function computeCalc(expression: string) {
  if (expression.includes("calc")) {
    const vhMatch = expression.match(/(\d+)vh/);
    const pxMatch = expression.match(/- (\d+)px/);

    const vhValue = vhMatch
      ? (window.innerHeight * parseInt(vhMatch[1], 10)) / 100
      : 0;
    const pxValue = pxMatch ? parseInt(pxMatch[1], 10) : 0;

    return vhValue - pxValue;
  } else if (expression.includes("vh")) {
    const vhMatch = expression.match(/(\d+)vh/);
    return vhMatch ? (window.innerHeight * parseInt(vhMatch[1], 10)) / 100 : 0;
  } else if (expression.includes("px")) {
    return parseInt(expression, 10);
  }
  return NaN; // Return NaN for unsupported formats
}
