import { Link } from 'react-router-dom';

import { useStore } from '@tanstack/react-store';
import { loadingPostsStore, postsStore } from '../store/postStore';

import FadeLoader from 'react-spinners/FadeLoader';

const Home = () => {
  const posts = useStore(postsStore);
  const loading = useStore(loadingPostsStore);

  return (
    <>
      <h2 className='mb-4 text-3xl font-bold'>Latest Posts:</h2>
      {loading ? (
        <FadeLoader />
      ) : posts.length > 0 ? (
        <ul className='list bg-base-100 rounded-box max-w-4xl shadow-md'>
          {posts.map(post => (
            <li key={post.id}>
              <Link
                to='/post'
                className='list-row'
              >
                <img
                  className='rounded-box size-10'
                  loading='lazy'
                  src={post.img}
                  alt={post.title}
                />
                <div>
                  <h3 className='text-xl'>{post.title}</h3>
                  <div className='text-xs font-semibold uppercase opacity-60'>
                    {post.subject}
                  </div>
                </div>
                <p className='list-col-wrap line-clamp-2 text-xs'>
                  {post.snippet}
                </p>
                <p className='text-xs opacity-60'>
                  {new Date(post.date).toLocaleDateString()}
                </p>
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
