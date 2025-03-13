import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import appRoutes from "./AppRoutes";

export default function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {appRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.pageElement} />
          ))}
        </Routes>
      </AppLayout>
    </Router>
  )
}
