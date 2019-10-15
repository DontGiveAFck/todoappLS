import { types, flow } from 'mobx-state-tree';
import {
    TodoListItem
} from './TodoListItemStore';
import { API_ERROR, DEBOUNCE_DELAY } from '../constants/constants'
import ApiExecutor from "../services/ApiExecutor";
import { debounce } from 'lodash';

/**
 * @class TodoListStore
 * @classdesc TodoListStore model
 */
export const TodoListStore = types
    .model('TodoListStore', {
        isPageLoading: types.boolean,
        todos: types.array(TodoListItem),
        searchFieldKey: types.string,
    })
    .views(self => ({
        /**
         * @function todoItemsLength
         * @desc get todos items length
         */
         get todoItemsLength() {
             return self.todos.length;
         }
    }))
    .actions(self => {
        /**
         * @function debouncedSearch
         * @desc debounce query request for search field
         */
        const debouncedSearch = debounce(() => {
            self.fetchTodoItemsBySearchKey().then((items) => self.getSearchedItems(items));
        }, DEBOUNCE_DELAY);

        return {
            /**
             * @function addTodo
             * @param todoItem - todoitem
             * @desc add todoitem to the list
             */
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
                self.onSearchFieldChange('');
                return self.saveTodoListItems();
            },

            /**
             * @function getSearchedItems
             * @desc save searched todoitems
             */
            getSearchedItems(todos) {
                self.todos = [...todos];
            },

            /**
             * @function removeTodo
             * @desc remove todoitem from the list
             */
            removeTodo(todoItem) {
                const itemToRemove = self.todos.find(item => item.title === todoItem.title);
                const id = self.todos.indexOf(itemToRemove);
                self.todos.splice(id, 1);
                return self.saveTodoListItems();
            },

            /**
             * @function removeTodo
             * @desc remove todoitem from the list
             */
            updateTodo(newData, oldData) {
                const itemToRemove = self.todos.find(item => item.title === oldData.title);
                const id = self.todos.indexOf(itemToRemove);
                self.todos[id] = newData;
                return self.saveTodoListItems();
            },

            /**
             * @function onSearchFieldChange
             * @desc change search field value and make request
             */
            onSearchFieldChange: (key) => {
                self.searchFieldKey = key;
                debouncedSearch();
            },

            /**
             * @function fetchTodoListItems
             * @desc fetch todoitems from API
             */
            fetchTodoListItems: flow(function* () {
                try {
                    self.isPageLoading = true;
                    self.todos = yield ApiExecutor.getTodoListItems();
                    self.isPageLoading = false;
                } catch (error) {
                    console.error(API_ERROR, error)
                }
            }),

            /**
             * @function saveTodoListItems
             * @desc save todoitems to API
             */
            saveTodoListItems: flow(function* fetchServices() {
                try {
                    self.isPageLoading = true;
                    const res = yield ApiExecutor.setTodoListItems(self.todos);
                    self.isPageLoading = false;
                    return res;
                } catch (error) {
                    console.error(API_ERROR, error);
                }
            }),

            /**
             * @function fetchTodoItemsBySearchKey
             * @desc fetch todoitems from API filtered by title
             */
            fetchTodoItemsBySearchKey: flow(function* fetchServices() {
                try {
                    self.isPageLoading = true;
                    const res = yield ApiExecutor.getTodoItemsBySearchKey(self.searchFieldKey);
                    self.isPageLoading = false;
                    return res;
                } catch (error) {
                    console.error(API_ERROR, error)
                }
            })
        }
    });
