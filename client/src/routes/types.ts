import { JSX } from 'react';

export interface IAppRoute {
  value: string;
  path: string;
  pageElement: JSX.Element;
  private: boolean;
  includeInMenu?: boolean;
}
