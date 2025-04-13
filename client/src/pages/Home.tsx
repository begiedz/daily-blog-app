import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getPosts } from '../api/postsApi';
import { getAffirmation } from '../api/externalApi';

import FadeLoader from 'react-spinners/FadeLoader';
import HeroPost from '../components/HeroPost';
import Alert from '../components/Alert';
import Post from '../components/Post';

import { IPost } from '../types';

interface Pagination {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

const Home = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [affirmation, setAffirmation] = useState('');

  useEffect(() => {
    const fetchAffirmation = async () => {
      const response = await getAffirmation();
      console.log(response);
      setAffirmation(response);
    };
    fetchAffirmation();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const paginationData = await getPosts(pageNumber);
      setPosts(paginationData.posts);
      setPagination(paginationData.pagination);
      setLoading(false);
    };
    fetchPosts();
  }, [pageNumber]);

  const handleNextPage = () => {
    if (pagination && pageNumber < pagination.totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <main className="w-[95%] max-w-4xl">
      <div className="mb-12 space-y-6 text-center">
        <h2 className="font-bold">Daily Blog</h2>
        <p className="text-5xl font-bold">Writings from our team</p>
        <p className="text-base-content/60 italic">
          {!affirmation ? (
            <FadeLoader className="mx-auto" />
          ) : (
            `"${affirmation}"`
          )}
        </p>
      </div>

      {loading ? (
        <FadeLoader className="mx-auto" />
      ) : posts.length > 0 ? (
        <>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(256px,0))] justify-center gap-6">
            {posts.map((post, index) => {
              const PostComponent = index === 0 ? HeroPost : Post;

              return (
                <li
                  key={index}
                  className={index === 0 ? 'col-span-full' : ''}
                >
                  <Link to={`/post/${post.slug}`}>
                    <PostComponent {...post} />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex justify-between">
            <button
              onClick={handlePreviousPage}
              disabled={pageNumber === 1}
              className="btn"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={!!pagination && pageNumber === pagination.totalPages}
              className="btn"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <Alert
          variant="Warning"
          className="mx-auto"
        >
          No posts at the moment!
        </Alert>
      )}
    </main>
  );
};

export default Home;
