import React from 'react';
import Notification from './Notification';

export default { title: 'Notification component' };

export const notificationAboutSuccess = () => (
    <Notification
        variant="success"
        message={'success!!!!'}
        open={true}
    />
);

export const notificationAboutError = () => (
    <Notification
        variant="error"
        message={'smth went wrong :('}
        open={true}
    />
);
