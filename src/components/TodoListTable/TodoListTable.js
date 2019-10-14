import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { tableColumns, tableIcons } from "../../declarations/todosTable";
import { inject, observer } from "mobx-react";
import { cn } from '@bem-react/classname';
import { Snackbar, Input } from "@material-ui/core";
import Notification from '../Notification/Notification';
import LinearProgress from '@material-ui/core/LinearProgress';
import { NOTIFICATION_SHOW_DURATION } from '../../constants/constants';

const block = cn('TodoListTable');

const TodoListTable = ({ store }) => {
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const {
        todos,
        fetchTodoListItems,
        isPageLoading,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodoItemsBySearchKey
    } = store;

    useEffect(() => {
        fetchTodoListItems();
    }, [fetchTodoListItems]);

    const showErrorNotification = () => {
        setShowErrorMessage(true);
        setTimeout(() => {
            setShowErrorMessage(false);
        }, NOTIFICATION_SHOW_DURATION)
    }

    const showSuccessNotification = () => {
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, NOTIFICATION_SHOW_DURATION)
    }

    const onRowDelete = rowData => new Promise((resolve, reject) => {
        try {
            removeTodo(rowData).then(() => {
                resolve(showSuccessNotification());
            })
        } catch{
            reject(showErrorNotification());
        }
    });

    const onRowUpdate = (newData, oldData) => new Promise((resolve, reject) => {
        try {
            updateTodo(newData, oldData).then(() => {
                resolve(showSuccessNotification());
            })
        } catch{
            reject(showErrorNotification());
        }
    });

    const onRowAdd = rowData => new Promise((resolve, reject) => {
        try {
            addTodo(rowData).then(() => {
                resolve(showSuccessNotification());
            })
        } catch {
            reject(showErrorNotification())
        }
    });

    const onSearchFieldChange = (e) => {
        console.log(e.target.value);
    }

    const getMainTable = () => (
        <div className={block('MainTable')}>
            <MaterialTable
                onSearchChange={() => console.log('search change')}
                customFilterAndSearch={() => false}
                onSelectionChange={() => console.log('sd')}
                icons={tableIcons}
                title="Todo list"
                columns={tableColumns}
                options={{
                    toolbarButtonAlignment: "right",
                    search: false,
                    loadingType: 'linear',
                    debounceInterval: 0
                }}
                data={todos}
                editable={{
                    onRowDelete,
                    onRowUpdate,
                    onRowAdd
                }}
                components={{
                    OverlayLoading: () => <LinearProgress/>
                }}
                isLoading={isPageLoading}
            />

        </div>
    );

    return (
        <div className={block()}>
            {getMainTable()}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}

                open={showSuccessMessage}
            >
                <Notification
                    variant="success"
                    message={'Successfully saved'}
                />
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={showErrorMessage}
            >
                <Notification
                    variant="error"
                    message={'Item with this title already exists'}
                />
            </Snackbar>
            <Input
                onChange={onSearchFieldChange}
            />
        </div>
    );
}

export default inject('store')(observer(TodoListTable));
