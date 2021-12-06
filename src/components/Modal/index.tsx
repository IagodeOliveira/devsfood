import { MouseEvent } from 'react';
import { Container, ModalBody } from './styled';
import { Props } from './types';

const Modal = ({ children, modal, setModal }: Props) => {
  const handleModal = (e: MouseEvent) => {
    if((e.target as HTMLElement).classList.contains('Container')) {
      setModal(false);
    }
  }

  return (
    <Container className="Container" modal={modal} onClick={handleModal}>
      <ModalBody>
        {children}
      </ModalBody>
    </Container>
  )
}

export default Modal
