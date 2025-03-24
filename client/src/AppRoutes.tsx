import About from './pages/About'
import Home from './pages/Home'
import Create from './pages/Create'
import Login from './pages/Login';
import { JSX } from 'react';

interface IAppRoutes {
  value: string
  path: string
  pageElement: JSX.Element
  private: boolean
  includeInMenu?: boolean
}

const appRoutes: IAppRoutes[] = [
  {
    value: 'Home',
    path: '/',
    pageElement: <Home />,
    private: false
  },
  {
    value: 'About',
    path: '/about',
    pageElement: <About />,
    private: false
  },
  {
    value: 'New Post',
    path: '/create',
    pageElement: <Create />,
    private: true
  },
  {
    value: 'Login',
    path: '/login',
    pageElement: <Login />,
    private: false,
    includeInMenu: false
  },
]
export default appRoutes;