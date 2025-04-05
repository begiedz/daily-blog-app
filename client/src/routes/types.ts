import { JSX } from 'react';
import { TRole } from '../store/types';

export interface IAppRoute {
  value: string;
  path: string;
  pageElement: JSX.Element;
  role: TRole[];
  includeInMenu?: boolean;
}
