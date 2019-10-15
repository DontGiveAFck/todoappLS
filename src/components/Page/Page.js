import { inject, observer } from "mobx-react";
import { cn } from '@bem-react/classname';
import { Input } from "@material-ui/core";
import Notification from '../Notification/Notification';
import { NOTIFICATION_SHOW_DURATION } from '../../constants/constants';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import React, {useState} from "react";
import TodoListTable from "../TodoListTable/TodoListTable";

import './Page.css';

const block = cn('Page');

/**
 * @function Page
 * @desc Renders Page container component
 * @author Arsen
 */
const Page = ({ store }) => {
    const [showErrorMessage, setShowErrorMessage] = useState(0);
    const [showSuccessMessage, setShowSuccessMessage] = useState(0);
    let notificationId = 0;

    const { searchFieldKey, onSearchFieldChange } = store;

    /**
     * @desc Show error notification
     * @param event - synthetic event
     * @author Arsen
     */
    const onSearchInputChange  = event => onSearchFieldChange(event.target.value);

    /**
     * @desc Show error notification
     * @author Arsen
     */
    const showErrorNotification = () => {
        setShowErrorMessage(1);
        clearTimeout(notificationId);
        notificationId = setTimeout(() => {
            setShowErrorMessage(0);
        }, NOTIFICATION_SHOW_DURATION)
    };

    /**
     * @desc Show success notification
     * @author Arsen
     */
    const showSuccessNotification = () => {
        setShowSuccessMessage(1);
        clearTimeout(notificationId);
        notificationId = setTimeout(() => {
            setShowSuccessMessage(0);
        }, NOTIFICATION_SHOW_DURATION)
    };

    /**
     * @desc renders search field
     * @author Arsen
     */
    const getSearchField = () => (
        <div className={block('SearchField')}>
            <Input
                onChange={onSearchInputChange}
                value={searchFieldKey}
                placeholder='Enter title'
                startAdornment={
                    <InputAdornment position="start">
                        <Search/>
                    </InputAdornment>
                }
            />
        </div>
    );

    return (
        <div className={block()}>
            <TodoListTable
                showSuccessNotification={showSuccessNotification}
                showErrorNotification={showErrorNotification}
                searchFieldKey={searchFieldKey}
            />
            <Notification
                variant="success"
                message={'Successfully saved'}
                open={showSuccessMessage}
            />
            <Notification
                variant="error"
                message={'Item with this title already exists'}
                open={showErrorMessage}
            />
            {getSearchField()}
        </div>
    );
}

export default inject('store')(observer(Page));
