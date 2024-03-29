import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, todoState } from './atoms';

interface IForm {
  toDo: string;
}

const CreateToDos = () => {
  const setToDos = useSetRecoilState(todoState);
  const { setValue, register, handleSubmit } = useForm<IForm>();
  const category = useRecoilValue(categoryState);
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => {
      const newToDos = {
        ...oldToDos,
        [category]: [...oldToDos[category], toDo]
      };
      localStorage.setItem('toDos', JSON.stringify(newToDos));
      return newToDos;
    });
    setValue('toDo', '');
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('toDo', {
          required: 'Please write a To Do.',
        })}
        placeholder='Write a to do'
      />
      <button>Add</button>
    </form>
  );
};

export default CreateToDos;
