import { types, flow } from 'mobx-state-tree';
import {
    TodoListItem
} from './TodoListItemStore';
import { API_ERROR } from '../constants/constants'
import ApiExecutor from "../api/ApiExecutor";

export const TodoListStore = types
    .model('TodoListStore', {
        isPageLoading: types.boolean,
        todos: types.array(TodoListItem),
        isError: types.boolean
    })
    .views(self => ({
            get completedTodos() {
                return self.todos.filter(t => t.isCompleted)
            }
    }))
    .actions(self => ({
            addTodo(todoItem) {
                const {
                    title = '',
                    description = '',
                    isCompleted = false,
                    date = new Date()
                } = todoItem;

                const isTodoExists = self.todos.find(todo => todo.title === title);

                if (isTodoExists) {
                    throw new Error('Already exists');
                }

                self.todos.push({
                    title,
                    description,
                    isCompleted,
                    date
                });

                return self.saveTodoListItems();
            },

            removeTodo(todoItem) {
                const itemToRemove = self.todos.find(item => item.title === todoItem.title);
                const id = self.todos.indexOf(itemToRemove);
                self.todos.splice(id, 1);
                return self.saveTodoListItems();
            },

            updateTodo(newData, oldData) {
                const itemToRemove = self.todos.find(item => item.title === oldData.title);
                const id = self.todos.indexOf(itemToRemove);
                self.todos[id] = newData;
                return self.saveTodoListItems();
            },

            fetchTodoListItems: flow(function*() {
                try {
                    self.isPageLoading = true;
                    self.todos = yield ApiExecutor.getTodoListItems();
                    self.isPageLoading = false;
                } catch (error) {
                    console.error(API_ERROR, error)
                }
            }),

            saveTodoListItems: flow(function* fetchServices() {
                try {
                    self.isPageLoading = true;
                    const res = yield ApiExecutor.setTodoListItems(self.todos);
                    self.isPageLoading = false;
                    return res;
                } catch (error) {
                    console.error(API_ERROR, error)
                }
            }),

            fetchTodoItemsBySearchKey: flow(function* fetchServices() {
                try {
                    self.isPageLoading = true;
                    const res = yield ApiExecutor.setTodoListItems(self.todos);
                    self.isPageLoading = false;
                    return res;
                } catch (error) {
                    console.error(API_ERROR, error)
                }
            })
        }
    ));
