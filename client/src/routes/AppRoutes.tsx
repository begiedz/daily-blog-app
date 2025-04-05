import About from '../pages/About';
import Home from '../pages/Home';
import Create from '../pages/Create';
import Login from '../pages/Login';
import { IAppRoute } from './types';

const AppRoutes: IAppRoute[] = [
  {
    value: 'Home',
    path: '/',
    pageElement: <Home />,
    role: [],
  },
  {
    value: 'About',
    path: '/about',
    pageElement: <About />,
    role: [],
  },
  {
    value: 'New Post',
    path: '/create',
    pageElement: <Create />,
    role: ['admin', 'author'],
  },
  {
    value: 'Log in',
    path: '/login',
    pageElement: <Login />,
    role: ['guest'],
    includeInMenu: false,
  },
];

export default AppRoutes;
