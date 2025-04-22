import { useStore } from '@tanstack/react-store';
import clsx from 'clsx';
import { useEffect, JSX } from 'react';
import * as motion from 'motion/react-client';
import { notificationStore, setNotification } from '../store/notificationStore';

import SuccessIcon from './icons/SuccessIcon';
import WarningIcon from './icons/WarningIcon';
import ErrorIcon from './icons/ErrorIcon';
import InfoIcon from './icons/InfoIcon';

const Alert = () => {
  const notification = useStore(notificationStore, s => s.notification);

  const icons: Record<string, JSX.Element> = {
    success: <SuccessIcon />,
    warning: <WarningIcon />,
    error: <ErrorIcon />,
    info: <InfoIcon />,
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (!notification) return null;

  const type =
    notification.type || (notification.status >= 400 ? 'error' : 'success');

  return (
    <motion.div
      role="alert"
      className={clsx(
        'alert fixed right-1/2 bottom-20 translate-x-1/2 md:right-20 md:translate-x-0',
        type === 'success' && 'alert-success',
        type === 'error' && 'alert-error',
        type === 'info' && 'alert-info',
        type === 'warning' && 'alert-warning',
      )}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.3 },
      }}
    >
      {icons[type] || <InfoIcon />}
      <span>
        {notification.status !== 200
          ? `${notification.status}: ${notification.message}`
          : notification.message}
      </span>
      <button
        onClick={() => setNotification(null)}
        className="size-6 cursor-pointer"
      >
        ✕
      </button>
    </motion.div>
  );
};

export default Alert;
