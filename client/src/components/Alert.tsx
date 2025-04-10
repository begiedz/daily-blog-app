import clsx from 'clsx';
import SuccessIcon from './icons/SuccessIcon';
import ErrorIcon from './icons/ErrorIcon';
import WarningIcon from './icons/WarningIcon';
import InfoIcon from './icons/InfoIcon';
import { ReactNode } from 'react';

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

  return (
    <div
      role="alert"
      className={clsx('alert', Variant[variant || 'Info'], className)}
    >
      {variant && icons[variant]}
      <span>{children}</span>
    </div>
  );
};

export default Alert;
