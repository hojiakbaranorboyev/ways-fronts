interface IAddress {
  id: string;
  name: string;
  slug: string;
  children?: IAddress[];
}
