import About from './pages/About'
import Home from './pages/Home'
import Create from './pages/Create'

const appRoutes = [
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
]
export default appRoutes;