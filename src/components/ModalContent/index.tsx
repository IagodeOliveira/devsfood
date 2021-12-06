import {
  Container,
  ProductArea,
  InfoArea,
  Details,
  Quantity,
  ButtonsArea,
} from "./styled";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Props } from './types';

const ModalContent = ({ data, setModal }: Props) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);

  const { status } = useSelector((state: User) => state.cart);

  const handleIconClick = (x: number) => {
    if (x < 0 && amount === 1) {
      return;
    }
    setAmount((prevState) => prevState + x);
  };

  const handleCartAddition = () => {
    if (status !== "on") {
      dispatch({
        type: "Set_Cart",
        payload: { data, amount },
      });
      setModal(false);
    } else {
      alert("To add new items to the cart wait until the purchase is finished");
    }
  };

  useEffect(() => {
    setAmount(1);
  }, [data]);

  return (
    <Container>
      <ProductArea>
        <img src={data.image ?? ""} alt={data.name} />
        <InfoArea>
          <Details>
            <span>{data.name ?? ""}</span>
            <span>{data.ingredients ?? ""}</span>
          </Details>
          <Quantity>
            <div className="controls">
              <RemoveIcon
                className="remove"
                onClick={() => handleIconClick(-1)}
              />
              <span className="quantity">{amount}</span>
              <AddIcon className="add" onClick={() => handleIconClick(1)} />
            </div>
            <span className="price">
              R$
              {data.price ? ` ` + (data.price * amount).toFixed(2) : ""}
            </span>
          </Quantity>
        </InfoArea>
      </ProductArea>
      <ButtonsArea>
        <button onClick={() => setModal(false)}>Cancel</button>
        <button onClick={handleCartAddition}>Add to Cart</button>
      </ButtonsArea>
    </Container>
  );
};

export default ModalContent;
