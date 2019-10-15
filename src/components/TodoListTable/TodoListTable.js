import React, { useEffect } from 'react';
import MaterialTable, {MTableAction} from 'material-table';
import { tableColumns, tableIcons } from "../../declarations/todosTable";
import { inject, observer } from "mobx-react";
import { cn } from '@bem-react/classname';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from "prop-types";

const block = cn('TodoListTable');

/**
 * @function TodoListTable
 * @desc Renders table with list of todos
 * @author Arsen
 */
const TodoListTable = ({ store, showSuccessNotification, showErrorNotification, searchFieldKey }) => {
    const {
        todos,
        fetchTodoListItems,
        isPageLoading,
        addTodo,
        removeTodo,
        updateTodo,
        todoItemsLength,
        onSearchFieldChange
    } = store;

    useEffect(() => {
        fetchTodoListItems();
    }, [fetchTodoListItems]);

    const isSearchFieldEmpty = () => !Boolean(searchFieldKey);

    /**
     * @desc delete row from the table
     * @param rowData - data of the table row
     * @author Arsen
     */
    const onRowDelete = rowData => new Promise((resolve, reject) => {
        try {
            removeTodo(rowData).then(() => {
                resolve(showSuccessNotification());
            })
        } catch{
            reject(showErrorNotification());
        }
    });

    /**
     * @desc update(change) row from the table
     * @param newData - new data of the row
     * @param oldData - old data of the row
     * @author Arsen
     */
    const onRowUpdate = (newData, oldData) => new Promise((resolve, reject) => {
        try {
            updateTodo(newData, oldData).then(() => {
                resolve(showSuccessNotification());
            })
        } catch{
            reject(showErrorNotification());
        }
    });

    /**
     * @desc add row to the table
     * @param rowData - new row data, that will be added to the table
     * @author Arsen
     */
    const onRowAdd = rowData => new Promise(async (resolve, reject) => {
        try {
            addTodo(rowData).then(() => {
                resolve(showSuccessNotification());
            })
        } catch {
            reject(showErrorNotification())
        }
    });

    return (
        <div className={block('MainTable')}>
            <MaterialTable
                onSearchChange={() => console.log('search change')}
                customFilterAndSearch={() => false}
                style={{height: '488px'}}
                icons={tableIcons}
                title="Todo list"
                columns={tableColumns}
                options={{
                    toolbarButtonAlignment: "right",
                    search: false,
                    loadingType: 'linear',
                    debounceInterval: 0,
                    paginationType: 'stepped',
                    pageSizeOptions: [],
                    pageSize: 5
                }}
                data={todos}
                editable={{
                    isDeletable: isSearchFieldEmpty,
                    isEditable: isSearchFieldEmpty,
                    onRowDelete,
                    onRowUpdate,
                    onRowAdd: isSearchFieldEmpty() ? onRowAdd : () => new Promise((resolve) => resolve(onSearchFieldChange('')))
                }}
                components={{
                    OverlayLoading: () => <LinearProgress/>,
                    FilterRow: () => null
                }}
                isLoading={isPageLoading}
            />
        </div>
    );
}

TodoListTable.propTypes = {
    showSuccessNotification: PropTypes.func,
    showErrorNotification: PropTypes.func,
    searchFieldKey: PropTypes.string
};

export default inject('store')(observer(TodoListTable));
