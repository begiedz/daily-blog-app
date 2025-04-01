import About from '../pages/About'
import Home from '../pages/Home'
import Create from '../pages/Create'
import Login from '../pages/Login'
import { IAppRoute } from './types'

const AppRoutes: IAppRoute[] = [
  {
    value: 'Home',
    path: '/',
    pageElement: <Home />,
    private: false,
  },
  {
    value: 'About',
    path: '/about',
    pageElement: <About />,
    private: false,
  },
  {
    value: 'New Post',
    path: '/create',
    pageElement: <Create />,
    private: true,
  },
  {
    value: 'Log in',
    path: '/login',
    pageElement: <Login />,
    private: false,
    includeInMenu: false,
  },
]

export default AppRoutes
