import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { todoState } from './atoms';

interface IForm {
  newCategory: string;
}

const CreateCategory = () => {
  const setToDos = useSetRecoilState(todoState);
  const { setValue, register, handleSubmit } = useForm<IForm>();
  const handleValid = ({ newCategory }: IForm) => {
    setToDos((oldToDos) => {
      const newToDos = {
        [newCategory]: [],
        ...oldToDos,
      };
      localStorage.setItem('toDos', JSON.stringify(newToDos));
      return newToDos;
    });
    setValue('newCategory', '');
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('newCategory', {
          required: 'Please write a category.',
        })}
        placeholder='Write a category'
      />
      <button>Add</button>
    </form>
  );
};

export default CreateCategory;
