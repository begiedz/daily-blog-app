import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getPosts } from '../api/postsApi';
import { getAffirmation, getRates } from '../api/externalApi';

import FadeLoader from 'react-spinners/FadeLoader';
import HeroPost from '../components/HeroPost';
import Post from '../components/Post';

import { IPost } from '../types';
import { handleApiNotify } from '../api/utils';

interface Pagination {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

interface Rate {
  currency: string;
  code: string;
  mid: number;
}

const Home = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [affirmation, setAffirmation] = useState('');
  const [rates, setRates] = useState<Rate[] | null>(null);

  useEffect(() => {
    const fetchAffirmation = async () => {
      try {
        const response = await getAffirmation();
        setAffirmation(response);
      } catch (err) {
        handleApiNotify(err);
      }
    };

    const fetchRates = async () => {
      try {
        const response = await getRates();
        setRates(response[0].rates);
      } catch (err) {
        handleApiNotify(err);
      }
    };

    fetchAffirmation();
    fetchRates();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const paginationData = await getPosts(pageNumber);
        setPosts(paginationData.posts);
        setPagination(paginationData.pagination);
      } catch (err) {
        handleApiNotify(err);
      } finally {
        setLoading(false);
      }
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

  const MarqueeItem = ({ rate }: { rate: Rate }) => {
    return (
      <div className="marquee-item flex-center flex-none">
        {rate.code}: {rate.mid}
      </div>
    );
  };

  return (
    <main className="w-[95%] max-w-4xl">
      {rates ? (
        <div className="marquee my-4 h-8 opacity-60">
          <div className="marquee-box w-20 gap-5 overflow-hidden">
            {rates.map((rate, i) => (
              <MarqueeItem
                key={i}
                rate={rate}
              />
            ))}
            {rates.map((rate, i) => (
              <MarqueeItem
                key={i}
                rate={rate}
              />
            ))}
          </div>
        </div>
      ) : (
        <FadeLoader className="mx-auto" />
      )}
      <div className="mb-12 space-y-6 text-center">
        <h2 className="font-bold">Daily Blog</h2>
        <p className="text-5xl font-bold">Writings from our team</p>
        <p className="italic opacity-60">
          {!affirmation ? (
            <FadeLoader className="mx-auto" />
          ) : (
            `"${affirmation}"`
          )}
        </p>
      </div>

      {loading ? (
        <FadeLoader className="mx-auto" />
      ) : (
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
      )}
    </main>
  );
};

export default Home;
