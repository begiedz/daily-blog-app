import { Link } from "react-router-dom"

const Home = () => {
  const posts = [
    {
      id: 0,
      title: "Dio Lupa",
      subject: "Remaining Reason",
      snippet: '"Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.',
      date: 1742035756,
      img: "https://img.daisyui.com/images/profile/demo/1@94.webp"
    },
    {
      id: 1,
      title: "Ellie Beilish",
      subject: "Bears of a Fever",
      snippet: '"Bears of a Fever" captivated audiences with its intense energy and mysterious lyrics. Its popularity skyrocketed after fans shared it widely online, earning Ellie critical acclaim.',
      date: 1742035757,
      img: "https://img.daisyui.com/images/profile/demo/4@94.webp"
    },
    {
      id: 2,
      title: "Sabrino Gardener",
      subject: "Cappuccino",
      snippet: '"Cappuccino" quickly gained attention for its smooth melody and relatable themes. The song’s success propelled Sabrino into the spotlight, solidifying their status as a rising star.',
      date: 1742035758,
      img: "https://img.daisyui.com/images/profile/demo/3@94.webp"
    }
  ]
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