import styled from 'styled-components';

type Active = {
  active: string;
}

export const Container = styled.div`
  width: 100%;
  padding: 15px;
`;

export const CategoryArea = styled.div`
  display: flex;
  flex-direction: column;
  color: #FFF;
  margin-top: 20px;
`;

export const CategoryList = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const ProductArea = styled.div`
  margin-top: 40px;
`;

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

export const ProductPaginationArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

export const ProductPaginationItem = styled.div<Active>`
  padding: 5px 10px;
  background-color: ${props => props.active};
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.66);
  border-radius: 5px;
  cursor: pointer;
  margin-left: 6px;
  margin-bottom: 10px;
  user-select: none;
`;