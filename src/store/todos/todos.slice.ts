import { createSlice } from '@reduxjs/toolkit';
import { todosInitialState, todosReducer } from '.';


export const todosSlice = createSlice({
    name: 'todos', // name used in action types
    initialState: todosInitialState, // initial state for the reducer
    reducers: todosReducer,
});

export const {
    actions: { // action creators exported from todosSlice.actions available out of the box
        create: createTodoActionCreator
    },
} = todosSlice;