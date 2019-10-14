import { connectReduxDevtools } from "mst-middlewares";
import { TodoListStore } from "./TodoListStore";
import remoteDev from 'remotedev';

export function createStore(snapshot) {
    // created store with snapshot from localstorage
    const store = TodoListStore.create(snapshot);

    // connect devtools
    connectReduxDevtools(remoteDev, store);
    return store;
}

export const initialState = {
    isPageLoading: false,
    todos: [],
    isError: false
};
