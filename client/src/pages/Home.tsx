import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useStore } from '@tanstack/react-store';
import { loadingPostsStore, postsStore } from '../store/postStore';
import { getAllPosts } from '../api/postsApi';

import FadeLoader from 'react-spinners/FadeLoader';
import Post from '../components/Post';
import HeroPost from '../components/HeroPost';
import Alert from '../components/Alert';

interface Pagination {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

const Home = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const posts = useStore(postsStore);
  const loading = useStore(loadingPostsStore);

  useEffect(() => {
    const fetchPosts = async () => {
      loadingPostsStore.setState(() => true);
      const paginationData = await getAllPosts(pageNumber);
      setPagination(paginationData);
      loadingPostsStore.setState(() => false);
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
        <p className="text-base-content/60">
          Latest news, trends, information.
        </p>
      </div>

      {loading ? (
        <FadeLoader className="mx-auto" />
      ) : posts.length > 0 ? (
        <>
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
              /*  
              The button will be disabled only if:
              - The pagination object exists (!!pagination is true).
              - The current page is the last page (pageNumber === pagination.totalPages)
              */
              disabled={!!pagination && pageNumber === pagination.totalPages}
              className="btn"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <Alert
          variant="WARNING"
          className="mx-auto"
        >
          No posts at the moment!
        </Alert>
      )}
    </main>
  );
};

export default Home;
