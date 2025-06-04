interface IObj<T = any> {
  [key: string]: T;
}
interface IResponseStandard<T> {
  data: T;
  error: string;
  message: string;
}
interface ITime{
  value: string;
  type: "today" | "tomorrow";
}