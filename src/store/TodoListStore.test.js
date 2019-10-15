import { TodoListStore } from "./TodoListStore";
import {createStore} from "./index";

describe('Todolist store model', () => {
    test('Successfully created store with 1 todo item', () => {
        const initialState = {
            isPageLoading: false,
            todos: [
                {
                    title: 'WASH CAR',
                    description: 'Wash your car maaan',
                    isCompleted: false,
                    date: new Date()
                }
            ],
            searchFieldKey: ''
        };

        const todoListStore = createStore(initialState);

        expect(todoListStore.todos.length).toBe(1);
    });

    test('Successfully added todolist item in the store', () => {
        // mocked initial state
        const initialState = {
            isPageLoading: false,
            todos: [
                {
                    title: 'title',
                    description: 'descr',
                    isCompleted: false,
                    date: new Date()
                }
            ],
            searchFieldKey: ''
        };

        // API mocked
        const saveTodoListItemsSpy = jest.fn();

        const mockedTodoListStore = TodoListStore.actions(() => ({
            saveTodoListItems: saveTodoListItemsSpy
        }));

        const store = mockedTodoListStore.create(initialState);

        // add todoitem, that not exists in the list
        store.addTodo({
            title: 'title2',
            description: 'descr',
            isCompleted: false,
            date: new Date()
        });

        expect(store.todos.length).toBe(2);
    });

    test("Can't add todolist item with dublicate title", () => {
        // mocked initial state
        const initialState = {
            isPageLoading: false,
            todos: [
                {
                    title: 'title',
                    description: 'descr',
                    isCompleted: false,
                    date: new Date()
                }
            ],
            searchFieldKey: ''
        };

        // API mocked
        const saveTodoListItemsSpy = jest.fn();

        const mockedTodoListStore = TodoListStore.actions(() => ({
            saveTodoListItems: saveTodoListItemsSpy
        }));

        const store = mockedTodoListStore.create(initialState);

        let errorMessage = '';

        // add todoitem, that already exists in the list
        try {
            store.addTodo({
                title: 'title',
                description: 'descr',
                isCompleted: false,
                date: new Date()
            });
        } catch(e) {
            errorMessage = e.message
        }

        expect(errorMessage).toBe('Already exists');
    });

    test("Successfully removed todo item from the list", () => {
        // mocked initial state
        const initialState = {
            isPageLoading: false,
            todos: [
                {
                    title: 'title',
                    description: 'descr',
                    isCompleted: false,
                    date: new Date()
                },
                {
                    title: 'TODOOOO',
                    description: 'to wake up',
                    isCompleted: false,
                    date: new Date()
                }
            ],
            searchFieldKey: ''
        };

        const itemToRemove = {
            title: 'title',
            description: 'descr',
            isCompleted: false,
            date: new Date()
        };

        // API mocked
        const saveTodoListItemsSpy = jest.fn();

        const mockedTodoListStore = TodoListStore.actions(() => ({
            saveTodoListItems: saveTodoListItemsSpy
        }));

        const store = mockedTodoListStore.create(initialState);

        // remove todoitem from the list
        store.removeTodo(itemToRemove);

        expect(store.todos.length).toBe(1);
    });
});
