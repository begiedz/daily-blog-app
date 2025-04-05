import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Create from '../pages/Create';
import PostPage from '../pages/PostPage';
import AdminPanel from '../pages/AdminPanel';

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

  // routes that you have to be logged in to see
  {
    name: 'New Post',
    path: '/create',
    pageElement: <Create />,
    role: [ADMIN, AUTHOR],
  },
  {
    name: 'Admin Panel',
    path: '/panel',
    pageElement: <AdminPanel />,
    role: [ADMIN],
  },

  // routes that are not included in the menu
  {
    name: 'Post',
    path: '/post/:slug',
    pageElement: <PostPage />,
    role: [],
    includeInMenu: false,
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
