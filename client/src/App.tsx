import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { loadingPostsStore } from './store/postStore'

import { useEffect } from 'react'

import { authOnEntry } from './auth'
import { getPosts } from './api/postsApi'
import AppRoutes from './routes/AppRoutes'
import AppLayout from './layouts/AppLayout'
import { filteredRoutes } from './routes/utils'
import { authStore } from './store/authStore'

export default function App() {
  useEffect(() => {
    authOnEntry()

    loadingPostsStore.setState(() => true)
    getPosts().then(() => loadingPostsStore.setState(() => false))
  }, [])

  const { user } = authStore.state

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
