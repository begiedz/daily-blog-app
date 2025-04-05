import About from '../pages/About';
import Home from '../pages/Home';
import Create from '../pages/Create';
import Login from '../pages/Login';
import { IAppRoute } from './types';
import { ERole } from '../store/types';

const { ADMIN, AUTHOR, GUEST } = ERole;

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
    role: [ADMIN, AUTHOR],
  },
  {
    name: 'Log in',
    path: '/login',
    pageElement: <Login />,
    role: [GUEST],
    includeInMenu: false,
  },
];

export default AppRoutes;
