import { useStore } from '@tanstack/react-store';
import { useEffect, JSX } from 'react';
import clsx from 'clsx';

import SuccessIcon from './icons/SuccessIcon';
import WarningIcon from './icons/WarningIcon';
import ErrorIcon from './icons/ErrorIcon';
import InfoIcon from './icons/InfoIcon';

import * as motion from 'motion/react-client';
import { errorStore, setErrorState } from '../store/errorStore';

const Alert = () => {
  const error = useStore(errorStore, s => s.error);
  console.log('Error in Alert:', error);
  const icons: Record<number, JSX.Element> = {
    200: <SuccessIcon />,
    400: <WarningIcon />,
    401: <ErrorIcon />,
    403: <ErrorIcon />,
    404: <ErrorIcon />,
    500: <ErrorIcon />,
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setErrorState(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!error) return null;

  return (
    <motion.div
      role="alert"
      className={clsx(
        'alert fixed right-1/2 bottom-20 translate-x-1/2 md:right-20 md:translate-x-0',
        error.status === 200
          ? 'alert-success'
          : error.status >= 401
            ? 'alert-error'
            : 'alert-warning',
      )}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.3 },
      }}
    >
      {icons[error.status] || <InfoIcon />}
      <span>{`${error.status}: ${error.message}`}</span>
      <button
        onClick={() => setErrorState(null)}
        className="size-6 cursor-pointer"
      >
        ✕
      </button>
    </motion.div>
  );
};

export default Alert;
