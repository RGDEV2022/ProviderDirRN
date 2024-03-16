import { create } from "zustand";
import { TProviderSuggestionOut, TProviderSearchOut } from "../test/apiCalls";

type TModalState = {
  modalState: boolean;
  handleModal: (state: boolean) => void;
  selectedProvider?: TProviderSuggestionOut;
  setSelectedProvider?: (state: TProviderSuggestionOut | undefined) => void;
  isMainSheetOpen?: boolean;
  setIsMainSheetOpen: (index: boolean | undefined) => void;
  isResultsSheetOpen?: boolean;
  setIsResultsSheetOpen: (index: boolean | undefined) => void;
  isProviderSheetOpen?: boolean;
  setIsProviderSheetOpen: (index: boolean | undefined) => void;
};

type TSearchState = {
  query?: string;
  setQuery?: (query: string) => void;
};

export const useSheetState = create<TModalState>((set) => ({
  modalState: false,
  handleModal: (state) => set({ modalState: state }),
  selectedProvider: undefined,
  setSelectedProvider: (payload) => set({ selectedProvider: { ...payload } }),
  isMainSheetOpen: true,
  setIsMainSheetOpen: (isMainSheetOpen) =>
    set((state) => ({ isMainSheetOpen })),
  isResultsSheetOpen: undefined,
  setIsResultsSheetOpen: (isResultsSheetOpen) =>
    set((state) => ({ isResultsSheetOpen })),
  isProviderSheetOpen: undefined,
  setIsProviderSheetOpen: (isProviderSheetOpen) =>
    set((state) => ({ isProviderSheetOpen })),
}));

export const useSearchState = create<TSearchState>((set) => ({
  query: undefined,
  setQuery: (query) => set({ query }),
}));

export default useSheetState;
