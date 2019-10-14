import { types } from 'mobx-state-tree'

export const TodoListItem = types
    .model({
        title: types.string,
        description: types.string,
        isCompleted: false,
        date: types.Date
    });