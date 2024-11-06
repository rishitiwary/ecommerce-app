import { atom } from 'recoil';
import { persistAtom } from 'recoil-persist';

export const cartState = atom({
  key: 'cartState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});