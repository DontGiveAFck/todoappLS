import { types } from 'mobx-state-tree'

/**
 * @class TodoListItem
 * @classdesc TodoListItem model
 */
export const TodoListItem = types
    .model({
        title: types.string,
        description: types.string,
        isCompleted: false,
        date: types.Date
    });