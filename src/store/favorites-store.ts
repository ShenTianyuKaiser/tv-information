import { create } from 'zustand'

export interface FavoritesStore {
  favorites: string[]
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
}

export const useFavoritesStore = create((set) => ({
  favorites: [],
  addFavorite: (id: string) => set((state: FavoritesStore) => ({ favorites: [...state.favorites, id] })),
  removeFavorite: (id: string) => set((state: FavoritesStore) => ({ favorites: state.favorites.filter((item) => item !== id) })),
}))
