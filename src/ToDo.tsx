import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, todoState } from './atoms';

const ToDo = ({ text, index }: { text: string; index: number }) => {
  const setToDos = useSetRecoilState(todoState);
  const toDos = useRecoilValue(todoState);
  const category = useRecoilValue(categoryState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldTodos) => {
      const fromTodo = oldTodos[category];
      const toTodo = oldTodos[name];
      const newToDo = { ...oldTodos, [name]: [...toTodo, text], [category]: [...fromTodo.slice(0, index), ...fromTodo.slice(index + 1)]  };
      localStorage.setItem('toDos', JSON.stringify(newToDo));
      return newToDo;
    });
  };
  return (
    <li>
      {text}
      {Object.keys(toDos).filter(cate => cate !== category).map((category, index) => (
        <button key={index} name={category} onClick={onClick}>
          {category}
        </button>
      ))}
    </li>
  );
};

export default ToDo;
