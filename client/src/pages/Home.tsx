import { Link } from 'react-router-dom';

import { useStore } from '@tanstack/react-store';
import { loadingPostsStore, postsStore } from '../store/postStore';

import FadeLoader from 'react-spinners/FadeLoader';
import Post from '../components/Post';

const Home = () => {
  const posts = useStore(postsStore);
  const loading = useStore(loadingPostsStore);

  return (
    <>
      <h2 className='mb-4 text-3xl font-bold'>Latest Posts:</h2>
      {loading ? (
        <FadeLoader />
      ) : posts.length > 0 ? (
        <ul className='space-y-4'>
          {posts.map(post => (
            <li key={post.slug}>
              <Link
                to={`/post/${post.slug}`}
                className='list-row'
              >
                <Post
                  imgUrl={post.img!}
                  title={post.title}
                  author={post.author}
                  createdAt={post.date}
                  excerpt={post.excerpt}
                  tags={post.tags}
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts at the moment!</p>
      )}
    </>
  );
};

export default Home;
