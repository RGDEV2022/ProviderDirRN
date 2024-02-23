import { create } from "zustand";

type TModalState = {
  modalState: boolean;
  handleModal: (state: boolean) => void;
};

const useModalState = create<TModalState>((set) => ({
  modalState: false,
  handleModal: (state) => set({ modalState: state }),
}));

export default useModalState;
