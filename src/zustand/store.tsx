import { City } from '../models/city'

import create from 'zustand';

type Store = {
  listFavoriteCity: City[];
  addCity: (city: City) => void;
};

const useStore = create<Store>((set) => ({
  listFavoriteCity: [],
  addCity: (city:City) =>
      set((state) => ({
        ...state,
        listFavoriteCity: [...state.listFavoriteCity, city],
      })),
}));

export default useStore;