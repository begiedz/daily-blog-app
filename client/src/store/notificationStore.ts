import { Store } from '@tanstack/react-store';
import { INotification } from '../types';

interface INotificationState {
  notification: INotification | null;
}

const initialState: INotificationState = {
  notification: null,
};

export const notificationStore = new Store<INotificationState>(initialState);

export const setNotification = (notification: INotification | null) => {
  console.log('Setting notification:', notification);
  notificationStore.setState(prevState => ({
    ...prevState,
    notification,
  }));
};
