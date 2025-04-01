import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { loadingPostsStore } from './store/postStore'

import { useEffect } from 'react'

import { authOnEntry } from './auth'
import { getPosts } from './api/postsApi'
import AppRoutes from './routes/AppRoutes'
import AppLayout from './layouts/AppLayout'
import { filteredRoutes } from './routes/utils'
import { authStore } from './store/authStore'
import { useStore } from '@tanstack/react-store'

export default function App() {
  useEffect(() => {
    authOnEntry()

    loadingPostsStore.setState(() => true)
    getPosts().then(() => loadingPostsStore.setState(() => false))
  }, [])
  const user = useStore(authStore, state => state.user)
  return (
    <Router>
      <AppLayout>
        <Routes>
          {filteredRoutes(AppRoutes, user).map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.pageElement}
            />
          ))}
        </Routes>
      </AppLayout>
    </Router>
  )
}
