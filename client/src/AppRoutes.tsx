import About from './pages/About'
import Home from './pages/Home'

const appRoutes = [
  {
    value: 'Home',
    path: '/',
    pageElement: <Home />
  },
  {
    value: 'About',
    path: '/about',
    pageElement: <About />
  }
]
export default appRoutes;