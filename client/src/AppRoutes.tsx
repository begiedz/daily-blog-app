import About from './pages/About'
import Home from './pages/Home'

const appRoutes = [
  {
    name: 'Home',
    path: '/',
    pageElement: <Home />
  },
  {
    name: 'About',
    path: '/about',
    pageElement: <About />
  }
]
export default appRoutes;