function stringify(obj: IObj) {
  return Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
}
function parse(str: string) {
  return str
    .replace(/^\?/, "")
    .split("&")
    .reduce((acc, part) => {
      const [key, value] = part.split("=").map(decodeURIComponent);
      if (key) acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
}

export { stringify, parse };
