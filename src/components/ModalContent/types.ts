
type LocalProducts = {
  id?: number;
  name?: string;
  image?: string;
  ingredients?: string;
  price?: number;
};

export type Props = {
  data: LocalProducts;
  setModal: (e: boolean) => void;
};