import React from 'react';
import { cn } from '@bem-react/classname';
import './App.css';
import { Container } from '@material-ui/core';
import TodoListTable from "../../components/TodoListTable/TodoListTable";
import { Provider } from 'mobx-react';
import { createStore, initialState } from "../../store";

const block = cn('App');

function App() {
    return (
        <Provider store={createStore(initialState)}>
            <div className={block()}>
                <Container>
                    <TodoListTable/>
                </Container>
            </div>
        </Provider>
    );
}

export default App;
