import { Container } from "./styled";
import { Props } from "./interfaces";

const CategoryItem = ({ data, active, newActive }: Props) => {
  return (
    <Container
      active={data.id === active ? true : false}
      onClick={() => newActive(data.id)}
      data-tip={data.name}
      data-for="tip-top"
    >
      <img src={data.image} alt="categories" />
    </Container>
  );
};

export default CategoryItem;
