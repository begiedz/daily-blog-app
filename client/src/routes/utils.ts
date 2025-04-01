import { IAppRoute } from './types';
import { TUser } from '../store/types';

interface IFilterOptions {
  onlyVisible?: boolean;
}

interface IFilteredRoutesProps {
  routes: IAppRoute[];
  user: TUser;
  options?: IFilterOptions;
}

export const filteredRoutes = ({
  routes,
  user,
  options = {},
}: IFilteredRoutesProps): IAppRoute[] =>
  routes.filter(route => {
    if (options.onlyVisible && route.includeInMenu === false) return false;
    if (route.private && !user) return false;
    return true;
  });
