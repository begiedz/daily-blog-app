import About from '../pages/About';
import Home from '../pages/Home';
import Create from '../pages/Create';
import Login from '../pages/Login';
import { IAppRoute } from './types';

const AppRoutes: IAppRoute[] = [
  {
    name: 'Home',
    path: '/',
    pageElement: <Home />,
    role: [],
  },
  {
    name: 'About',
    path: '/about',
    pageElement: <About />,
    role: [],
  },
  {
    name: 'New Post',
    path: '/create',
    pageElement: <Create />,
    role: ['admin', 'author'],
  },

  {
    name: 'Log in',
    path: '/login',
    pageElement: <Login />,
    role: ['guest'],
    includeInMenu: false,
  },
];

export default AppRoutes;
