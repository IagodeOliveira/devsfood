import styled from 'styled-components';

type Modal = {
  modal: boolean;
}

export const Container = styled.div<Modal>`
  display: ${props => props.modal ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
`;

export const ModalBody = styled.div`
  max-width; 100vw;
  max-height; 90vh;
  background-color: #FFF;
  border-radius: 20px;
  box-shadow: 0 0 50px #000;
  overflow: auto;
`;