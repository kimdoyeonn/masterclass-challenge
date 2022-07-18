import { atom, selector } from 'recoil';

export interface IToDo {
  [key: string]: string[];
}

export const todoState = atom<IToDo>({
  key: 'toDo',
  default: JSON.parse(
    localStorage.getItem('toDos') ??
      JSON.stringify({ toDo: [], doing: [], done: [] })
  ),
});

export const categoryState = atom({
  key: 'categoryState',
  default: Object.keys(todoState)[0],
});

export const todoSelector = selector({
  key: 'todoSelector',
  get: ({ get }) => {
    const toDos = get(todoState);
    const category = get(categoryState);
    return toDos[category];
  },
});
