import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { IPost } from "../types"

const Home = () => {

  const [posts, setPosts] = useState<IPost[] | []>([])

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      const json = await response.json()
      console.log(json)
      return json

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error('unknown error ocured');
      }
    }
  }

  useEffect(() => {
    const getPosts = async (url: string) => {
      const data = await fetchData(url)
      if (data) setPosts(data)
    }
    getPosts('/test-api/posts.json')
  }, [])

  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Latest Posts:</h2>
      <ul className="list bg-base-100 rounded-box shadow-md">
        {posts.map((post) => {
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