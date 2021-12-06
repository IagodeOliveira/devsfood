import { ReactNode } from 'react';

export type Props = {
  modal: boolean;
  setModal: (e: boolean) => void;
  children: ReactNode;
}

export type Modal = {
  modal: boolean;
}