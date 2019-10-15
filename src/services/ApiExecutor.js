import LocalStorage from "./LocalStorage";
import { API_DELAY, LOCAL_STORAGE_TODOS } from "../constants/constants";

/**
 * @class ApiExecutor
 * @classdesc Mocked API
 */
export default class ApiExecutor {
    /**
     * @function getTodoListItems
     * @desc get todolist items from API
     * @return Promise<Array<TodoListItem>>
     */
    static getTodoListItems() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = LocalStorage.getItem(LOCAL_STORAGE_TODOS) || [];
                resolve(data.map(item => ({...item, date: new Date(item.date)})));
            }, API_DELAY);
        })
    }

    /**
     * @function setTodoListItems
     * @desc get todolist items from API
     * @param items - Array<TodoListItem> - array of todoitems
     * @return Promise<object>
     */
    static setTodoListItems(items) {
        return new Promise((resolve) => {
            setTimeout(() => {
                LocalStorage.setItem(LOCAL_STORAGE_TODOS, items);
                resolve({
                    success: true
                });
            }, API_DELAY);
        })
    }

    /**
     * @function setTodoListItems
     * @desc get todolist items from API
     * @param key - string - filtering key
     * @return Promise<TodoListItem>
     */
    static getTodoItemsBySearchKey(key) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = LocalStorage.getItem(LOCAL_STORAGE_TODOS);
                resolve(
                    data
                        .filter(item => item.title.includes(key))
                        .map(item => ({...item, date: new Date(item.date)}))
                );
            }, API_DELAY);
        })
    }
}
