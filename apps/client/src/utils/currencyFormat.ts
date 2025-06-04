export function currencyFormat(value: number | bigint) {
  return new Intl.NumberFormat().format(value).split(",").join(" ");
}
