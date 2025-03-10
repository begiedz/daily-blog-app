import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Start from './pages/Start'
import About from './pages/About'

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/start">Start</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/start" element={<Start />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}
