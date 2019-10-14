import LocalStorage from "../services/LocalStorage";
import { API_DELAY, LOCAL_STORAGE_TODOS } from "../constants/constants";

export default class ApiExecutor {
    static getTodoListItems() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = LocalStorage.getItem(LOCAL_STORAGE_TODOS) || [];
                resolve(data.map(item => ({...item, date: new Date(item.date)})));
            }, API_DELAY);
        })
    }

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

    // static getTodoItemsBySearchKey(key) {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             LocalStorage.getItem(LOCAL_STORAGE_TODOS);
    //             resolve(data.map(item => ({...item, date: new Date(item.date)})));
    //         }, API_DELAY);
    //     })
    // }
}
