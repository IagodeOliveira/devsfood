import { Container } from "./styled";
import { Props } from "./types";

const CategoryItem = ({ data, active, newActive, pageActive, pActive }: Props) => {
  const handleClick = () => {
    if (pActive > 1) {
      pageActive(1);
    }
    newActive(data.id);
  }
  return (
    <Container
      active={data.id === active ? true : false}
      onClick={handleClick}
      data-tip={data.name}
      data-for="tip-top"
    >
      <img src={data.image} alt="categories" />
    </Container>
  );
};

export default CategoryItem;
