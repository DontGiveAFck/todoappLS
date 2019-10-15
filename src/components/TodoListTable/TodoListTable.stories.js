import React from 'react';
import TodoListTable from './TodoListTable';

export default { title: 'TodoListTable component' };

export const todoListTable = () => (
    <TodoListTable
        variant="success"
        message={'success!!!!'}
        store={{
            todos: [{
                title: 'WASH CAR',
                description: 'Wash your car maaan',
                isCompleted: false,
                date: new Date()
            }],
            fetchTodoListItems: () => console.log('fetch items'),
            isPageLoading: false,
            addTodo: () => console.log('add item'),
            removeTodo: () => console.log('remove item'),
            updateTodo: () => console.log('update item'),
            todoItemsLength: 1
        }}
    />
);
