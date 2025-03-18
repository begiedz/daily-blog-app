import { useEffect } from "react"
import { Link } from "react-router-dom"

import { useStore } from "@tanstack/react-store"
import { postsStore } from "../store"

import axios from "axios"

const Home = () => {
  const posts = useStore(postsStore)

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get('/test-api/posts.json')
        postsStore.setState(() => response.data)
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error instanceof Error ? error.message : "Unknown error")
      }
    }

    getPosts()
  }, [])

  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Latest Posts:</h2>
      <ul className="list bg-base-100 rounded-box shadow-md">
        {posts.length > 0 &&
          posts.map((post) => {
            return (
              <li key={post.id}>
                <Link to="/post" className="list-row">
                  <div>
                    <img
                      className="size-10 rounded-box"
                      src={post.img} />
                  </div>
                  <div>
                    <h3 className="text-xl">{post.title}</h3>
                    <div className="text-xs uppercase font-semibold opacity-60">{post.subject}</div>
                  </div>
                  <p className="list-col-wrap text-xs truncate">
                    {post.snippet}
                  </p>
                </Link>
              </li>
            )
          })}
      </ul >
    </>
  )
}

export default Home