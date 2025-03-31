import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { loadingPostsStore } from './store/postStore'

import AppLayout from './layouts/AppLayout'
import AppRoutes from './AppRoutes'
import { useEffect } from 'react'
import { getPosts } from './api/postsApi'
import { authOnEntry } from './auth'

export default function App() {
  useEffect(() => {
    authOnEntry()

    loadingPostsStore.setState(() => true)
    getPosts().then(() => loadingPostsStore.setState(() => false))
  }, [])

  return (
    <Router>
      <AppLayout>
        <Routes>
          {AppRoutes.map((route, index) => (
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
