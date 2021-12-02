import { MouseEvent, ReactNode } from 'react';
import { Container, ModalBody } from './styled';

type ModalProps = {
  modal: boolean;
  setModal: (e: boolean) => void;
  children: ReactNode;
}

const Modal = ({ children, modal, setModal }: ModalProps) => {
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
