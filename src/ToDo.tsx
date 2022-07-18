import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, IToDo, todoState } from './atoms';

const ToDo = ({ text }: { text: string }) => {
  const setToDos = useSetRecoilState(todoState);
  const toDos = useRecoilValue(todoState);
  const category = useRecoilValue(categoryState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldTodos) => {
      const targetIndex = oldTodos[name];
      const oldToDo = oldTodos[targetIndex];
      const newToDo = { ...oldToDo,  };
      return [
        ...oldTodos.slice(0, targetIndex),
        newToDo,
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      {text}
      {Object.keys(toDos).map((category, index) => (
        <button key={index} name={category} onClick={onClick}>
          {category}
        </button>
      ))}
    </li>
  );
};

export default ToDo;
