
type Categories = {
  id: number;
  name: string;
  image: string;
}

export type Props = {
  data: Categories;
  active: number;
  newActive: (e: number) => void;
  pageActive: (e: number) => void;
  pActive: number;
}

export type Active = {
  active: boolean;
}