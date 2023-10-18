import { atom, selector } from 'recoil';
import { message } from "antd";

export const favoritesAtomRecoil = atom<string[]>({
  key: 'favoritesAtom',
  default: [],
  effects: [
    ({onSet})=>{
      onSet((newValue, oldValue) => {
        message.info(` [Recoil atom effects] \n Favorites updated! \n Old value is ${JSON.stringify(oldValue)}, new value is ${JSON.stringify(newValue)}`, 5);
      });
    },
    ({onSet})=>{
      onSet((newValue) => {
        localStorage.setItem('favorites', JSON.stringify(newValue));
      });
    }
  ],
});

export const favoritesSelector = selector({
  key: 'favoritesSelector',
  get: ({get}) => {
    const favorites = get(favoritesAtomRecoil);
    const length = favorites.length;
    return length < 1 ? '' : `截止目前，您已经收藏了${length}个节目，它们的Id分别是：${favorites.join(', ')}`
  },
  set: ({set, get}, newValue) => {
    set(favoritesAtomRecoil, []);
    message.info(` [Recoil selector effects] \n Favorites now is empty!`, 5);
  }
});
