import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { authStore } from './store/authStore'
import { jwtDecode } from 'jwt-decode'
import { loadingPostsStore } from './store/postStore'
import { ITokenPayload } from './hooks/useLogin'

import AppLayout from './layouts/AppLayout'
import appRoutes from './AppRoutes'
import { useEffect } from 'react'
import { getPosts } from './api/postApi'

export default function App() {
  useEffect(() => {
    //get auth
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = jwtDecode<ITokenPayload>(token)
      authStore.setState(prevState => {
        return {
          ...prevState,
          user: {
            username: decoded.unique_name,
            role: decoded.role,
          },
        }
      })
    }
    //get posts
    loadingPostsStore.setState(() => true)
    getPosts().then(() => loadingPostsStore.setState(() => false))
  }, [])

  return (
    <Router>
      <AppLayout>
        <Routes>
          {appRoutes.map((route, index) => (
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
