
type Products = {
  id: number;
  name: string;
  image: string;
  ingredients: string;
  price: number;
}

export type Props = {
  data: Products;
  modal: (e: boolean) => void;
  modalData: (e: Products) => void;
}