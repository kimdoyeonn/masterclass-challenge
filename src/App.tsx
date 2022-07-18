import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryState, todoSelector, todoState } from './atoms';
import CreateCategory from './CreateCategory';
import CreateToDos from './CreateToDos';
import ToDo from './ToDo';


function App() {
  const toDos = useRecoilValue(todoSelector);
  const allToDos = useRecoilValue(todoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1>ToDo List</h1>
      <hr />
      <CreateCategory />
      <select value={category} onInput={onInput}>
        {Object.keys(allToDos).map((cate, index) => <option value={cate} key={index}>{cate}</option>)}
      </select>
      <CreateToDos />
      {toDos.map((toDo) => <ToDo key={toDo} text={toDo} />)}
    </div>
  );
}

export default App;
