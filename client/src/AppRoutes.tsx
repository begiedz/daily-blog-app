import About from './pages/About'
import Start from './pages/Start'

const appRoutes = [
  {
    name: 'Start',
    path: '/start',
    pageElement: <Start />
  },
  {
    name: 'About',
    path: '/about',
    pageElement: <About />
  }
]
export default appRoutes;