import clsx from 'clsx';
import SuccessIcon from './icons/SuccessIcon';
import ErrorIcon from './icons/ErrorIcon';
import WarningIcon from './icons/WarningIcon';
import InfoIcon from './icons/InfoIcon';
import { ReactNode } from 'react';

enum Variant {
  SUCCESS = 'alert-success',
  ERROR = 'alert-error',
  WARNING = 'alert-warning',
  INFO = 'alert-info',
}

interface AlertProps {
  children?: ReactNode;
  variant?: keyof typeof Variant;
  className?: string;
}

const Alert = ({ children, variant, className }: AlertProps) => {
  const icons = {
    SUCCESS: <SuccessIcon />,
    ERROR: <ErrorIcon />,
    WARNING: <WarningIcon />,
    INFO: <InfoIcon />,
  };

  return (
    <div
      role="alert"
      className={clsx('alert', Variant[variant || 'INFO'], className)}
    >
      {variant && icons[variant]}
      <span>{children}</span>
    </div>
  );
};

export default Alert;
