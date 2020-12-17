import { v1 as uuid } from 'uuid';
import { ITodo } from 'interfaces/todo';

export const todosInitialState: ITodo[] = [
    {
        id: uuid(),
        desc: 'Learn Redux-ToolKit',
        isComplete: false,
    },
];