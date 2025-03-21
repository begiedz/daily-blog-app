import { Link } from "react-router-dom"

import { useStore } from "@tanstack/react-store"
import { loadingPostsStore, postsStore } from "../store"

import FadeLoader from "react-spinners/FadeLoader";




const Home = () => {
  const posts = useStore(postsStore)
  const loading = useStore(loadingPostsStore)

  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Latest Posts:</h2>
      {loading ? (
        <FadeLoader />
      ) : posts.length > 0 ? (
        <ul className="list bg-base-100 rounded-box shadow-md max-w-4xl">
          {posts.map((post) => (
            <li key={post.id}>
              <Link to="/post" className="list-row">
                <img className="size-10 rounded-box" loading="lazy" src={post.img} alt={post.title} />
                <div>
                  <h3 className="text-xl">{post.title}</h3>
                  <div className="text-xs uppercase font-semibold opacity-60">{post.subject}</div>
                </div>
                <p className="list-col-wrap text-xs line-clamp-2">{post.snippet}</p>
                <p className="text-xs opacity-60">{new Date(post.date).toLocaleDateString()}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts at the moment!</p>
      )}
    </>
  )
}

export default Home