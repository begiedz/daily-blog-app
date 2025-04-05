import { Link } from 'react-router-dom';

import { useStore } from '@tanstack/react-store';
import { loadingPostsStore, postsStore } from '../store/postStore';

import FadeLoader from 'react-spinners/FadeLoader';
import Post from '../components/Post';
import HeroPost from '../components/HeroPost';

const Home = () => {
  const posts = useStore(postsStore);
  const loading = useStore(loadingPostsStore);

  return (
    <main className="w-[95%] max-w-4xl">
      <div className="mb-12 space-y-6 text-center">
        <h2 className="font-bold">Daily Blog</h2>
        <p className="text-5xl font-bold">Writings from our team</p>
        <p className="text-base-content/60">
          Latest news, trends, information.
        </p>
      </div>

      {loading ? (
        <FadeLoader />
      ) : posts.length > 0 ? (
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(256px,0))] justify-center gap-6">
          {posts.map((post, index) => {
            const postProps = {
              slug: post.slug,
              imgUrl: post.imgUrl!,
              title: post.title,
              author: post.author,
              createdAt: post.createdAt,
              excerpt: post.excerpt,
              tags: post.tags,
            };

            const PostComponent = index === 0 ? HeroPost : Post;

            return (
              <li
                key={index}
                className={index === 0 ? 'col-span-full' : ''}
              >
                <Link to={`/post/${post.slug}`}>
                  <PostComponent {...postProps} />
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No posts at the moment!</p>
      )}
    </main>
  );
};

export default Home;
