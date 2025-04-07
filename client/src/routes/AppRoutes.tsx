import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Create from '../pages/Create';
import PostPage from '../pages/PostPage';
import PostsPanel from '../pages/PostsPanel';
import AdminPanel from '../pages/AdminPanel';
import ProfilePanel from '../pages/ProfilePanel';
import ManageAllPosts from '../pages/ManagePosts';
import ManageAllUsers from '../pages/ManageAllUsers';

import { IAppRoute } from './types';
import { ERole } from '../store/types';

const { ADMIN, AUTHOR, USER, GUEST } = ERole;

const AppRoutes: IAppRoute[] = [
  // public routes
  {
    name: 'Home',
    path: '/',
    pageElement: <Home />,
    role: [],
    icon: '🏠',
  },
  {
    name: 'About',
    path: '/about',
    pageElement: <About />,
    role: [],
    icon: 'ℹ️',
  },

  // routes that you have to be logged in to see
  {
    name: 'New Post',
    path: '/create',
    pageElement: <Create />,
    role: [ADMIN, AUTHOR],
    icon: '📝',
  },
  {
    name: 'My Posts',
    path: '/posts',
    pageElement: <PostsPanel />,
    role: [ADMIN, AUTHOR],
    icon: '📂',
  },
  {
    name: 'My Profile',
    path: '/profile',
    pageElement: <ProfilePanel />,
    role: [ADMIN, AUTHOR, USER],
    icon: '👤',
  },
  {
    name: 'Admin Panel',
    path: '/panel',
    pageElement: <AdminPanel />,
    role: [ADMIN],
    icon: '⚙️',
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
  {
    name: 'Manage Posts',
    path: '/panel/posts',
    pageElement: <ManageAllPosts />,
    role: [ADMIN],
    includeInMenu: false,
  },
  {
    name: 'Manage Users',
    path: '/panel/users',
    pageElement: <ManageAllUsers />,
    role: [ADMIN],
    includeInMenu: false,
  },
];

export default AppRoutes;
