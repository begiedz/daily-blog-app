import { Link } from 'react-router-dom';

import { useStore } from '@tanstack/react-store';
import { loadingPostsStore, postsStore } from '../store/postStore';

import FadeLoader from 'react-spinners/FadeLoader';
import Post from '../components/Post';

const Home = () => {
  const posts = useStore(postsStore);
  const loading = useStore(loadingPostsStore);

  return (
    <div className='w-[90%]'>
      <h2 className='mb-4 text-3xl font-bold'>Latest Posts:</h2>
      {loading ? (
        <FadeLoader />
      ) : posts.length > 0 ? (
        <ul className='grid grid-cols-[repeat(auto-fit,minmax(256px,0))] justify-center gap-6'>
          {posts.map((post, index) => (
            <li
              key={post.slug}
              className={index === 0 ? 'col-span-full' : ''}
            >
              <Link to={`/post/${post.slug}`}>
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
    </div>
  );
};

export default Home;
