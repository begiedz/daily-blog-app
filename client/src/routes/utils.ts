import { IAppRoute, TUser } from '../types';

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
}: IFilteredRoutesProps): IAppRoute[] => {
  // if user is null, set userRole to 'guest', nullish coalescing operator, optional chaining
  const userRole = user?.role ?? 'guest';

  return routes.filter(route => {
    if (options.onlyVisible && route.includeInMenu === false) return false;
    if (!route.role || route.role.length === 0) return true;
    return route.role.includes(userRole);
  });
};
