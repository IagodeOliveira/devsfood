import { Container, InfoArea, ButtonArea } from "./styled";
import { Props } from "./types";

const ProductItem = ({ data, modal, modalData }: Props) => {
  const handleClick = () => {
    modal(true);
    modalData(data);
  };
  return (
    <Container onClick={handleClick}>
      <img className="productImg" src={data.image} alt="products" />
      <InfoArea>
        <span className="productName">{data.name}</span>
        <span className="productPrice">R$ {data.price}</span>
        <span className="ingredients">
          {data.ingredients || "no ingredients available"}
        </span>
      </InfoArea>
      <ButtonArea>
        <img src="/assets/next.png" alt="next icon" />
      </ButtonArea>
    </Container>
  );
};

export default ProductItem;
