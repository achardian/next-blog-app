import { create } from "zustand";

type AuthModalStore = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

const useAuthModalStore = create<AuthModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (state) => set(() => ({ isOpen: state })),
}));

export default useAuthModalStore;
