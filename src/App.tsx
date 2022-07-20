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
  console.log(allToDos, Object.keys(allToDos))
  return (
    <div>
      <h1>ToDo List</h1>
      <hr />
      <CreateCategory />
      <select value={category} onInput={onInput}>
        {Object.keys(allToDos).map((cate, index) => <option value={cate} key={index}>{cate}</option>)}
      </select>
      <CreateToDos />
      {toDos.map((toDo, index) => <ToDo key={toDo} text={toDo} index={index} />)}
    </div>
  );
}

export default App;
