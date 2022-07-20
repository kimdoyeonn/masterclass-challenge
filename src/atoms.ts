import { atom, selector } from 'recoil';

export interface IToDo {
  [key: string]: string[];
}

export const todoState = atom<IToDo>({
  key: 'toDos',
  default: JSON.parse(
    localStorage.getItem('toDos') ??
      JSON.stringify({ toDo: [], doing: [], done: [] })
  ),
});

export const categoryState = atom({
  key: 'categoryState',
  default: 'toDo',
});

export const todoSelector = selector({
  key: 'todoSelector',
  get: ({ get }) => {
    const toDos = get(todoState);
    const category = get(categoryState);
    return toDos[category];
  },
});
