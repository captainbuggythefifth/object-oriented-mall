import { PayloadAction } from '@reduxjs/toolkit';
import { v1 as uuid } from 'uuid';

import { ITodo } from 'interfaces/todo';

export const todosReducer = {
    create: {
        reducer: (
            state: ITodo[],
            action: PayloadAction<{ id: string; desc: string; isComplete: boolean }>
        ) => {
            state.push(action.payload);
        },
        prepare: ({ desc }: { desc: string }) => ({
            payload: {
                id: uuid(),
                desc,
                isComplete: false,
            },
        }),
    }
};