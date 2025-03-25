import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { loadingPostsStore } from "./store/postStore"

import AppLayout from "./layouts/AppLayout";
import appRoutes from "./AppRoutes";
import { useEffect } from "react";
import { getPosts } from "./api/postApi";

export default function App() {

  useEffect(() => {
    const date = new Date()
    console.log(date.toISOString());
    loadingPostsStore.setState(() => true)
    getPosts().then(() => loadingPostsStore.setState(() => false))
  }, [])

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
