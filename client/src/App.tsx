import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import axios from "axios"

import { loadingPostsStore, postsStore } from "./store"

import AppLayout from "./layouts/AppLayout";
import appRoutes from "./AppRoutes";
import { useEffect } from "react";

const fetchData = async () => {
  try {
    const response = await axios.get('/test-api/posts.json')
    postsStore.setState(() => response.data)
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error instanceof Error ? error.message : "Unknown error")
  }
}

export default function App() {

  useEffect(() => {
    const date = new Date()
    console.log(date.toISOString());
    loadingPostsStore.setState(() => true)
    fetchData().then(() => loadingPostsStore.setState(() => false))
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
