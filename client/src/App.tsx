import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useEffect } from 'react';

import { authOnEntry } from './auth';
import AppRoutes from './routes/AppRoutes';
import AppLayout from './layouts/AppLayout';
import { filteredRoutes } from './routes/utils';
import { authStore } from './store/authStore';
import { useStore } from '@tanstack/react-store';
import Alert from './components/Alert';

export default function App() {
  useEffect(() => {
    authOnEntry();
  }, []);
  const user = useStore(authStore, state => state.user);
  return (
    <Router>
      <AppLayout>
        <Routes>
          {filteredRoutes({ routes: AppRoutes, user }).map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.pageElement}
            />
          ))}
        </Routes>
      </AppLayout>
      <Alert />
    </Router>
  );
}
