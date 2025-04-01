import { IAppRoute } from './types'
import { TUser } from '../store/types'

export const filteredRoutes = (routes: IAppRoute[], user: TUser | null) =>
  routes.filter(route => {
    if (route.private && !user) return false
    return true
  })

export const visibleRoutes = (routes: IAppRoute[], user: TUser | null) =>
  routes.filter(route => {
    if (route.includeInMenu === false) return false
    if (route.private && !user) return false
    return true
  })
