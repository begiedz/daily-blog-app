import clsx from 'clsx';
import SuccessIcon from './icons/SuccessIcon';
import ErrorIcon from './icons/ErrorIcon';
import WarningIcon from './icons/WarningIcon';
import InfoIcon from './icons/InfoIcon';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import * as motion from 'motion/react-client';

enum Variant {
  Success = 'alert-success',
  Error = 'alert-error',
  Warning = 'alert-warning',
  Info = 'alert-info',
}

interface AlertProps {
  children?: ReactNode;
  variant?: keyof typeof Variant;
  className?: string;
}

const Alert = ({ children, variant, className }: AlertProps) => {
  const icons = {
    Success: <SuccessIcon />,
    Error: <ErrorIcon />,
    Warning: <WarningIcon />,
    Info: <InfoIcon />,
  };

  return createPortal(
    <motion.div
      role="alert"
      className={clsx(
        'alert fixed bottom-20 left-1/2 -translate-x-1/2',
        Variant[variant || 'Info'],
        className,
      )}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.3 },
      }}
    >
      {variant && icons[variant]}
      <span>{children}</span>
    </motion.div>,
    document.body,
  );
};

export default Alert;
