import { useParams } from 'react-router-dom';
import { getPost } from '../api/postsApi';
import { useEffect, useState } from 'react';
import Alert from '../components/Alert';
import FadeLoader from 'react-spinners/FadeLoader';
import { isApiError } from '../api/utils';
import { IPost } from '../types';

const PostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleFetchPost = async (slug: string) => {
    try {
      const postData = await getPost(slug);
      setPost(postData);
    } catch (err) {
      if (isApiError(err)) {
        setError(`${err.status}: ${err.message}`);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) handleFetchPost(slug);
    return () => {
      setLoading(true);
      setError(null);
    };
  }, [slug]);

  if (loading) return <FadeLoader className="mx-auto" />;
  if (error || !post) return <Alert variant="Error">{error}</Alert>;

  return (
    <main className="mx-auto w-full max-w-4xl space-y-6 p-6">
      <img
        src={post?.imageUrl || '/no-image.jpg'}
        alt={`${post?.title || 'Post'} image`}
        className="card h-70 w-full object-cover shadow-md"
      />
      <div className="space-y-2">
        <div className=" ">
          <p className="font-bold">
            {post.author} • {new Date(post.createdAt).toLocaleDateString()}
          </p>
          {post.modifiedBy && post.modifiedAt ? (
            <p className="text-xs italic opacity-40">
              Modyfied by: {post.modifiedBy} •{' '}
              {new Date(post.modifiedAt).toLocaleDateString()}
            </p>
          ) : null}
        </div>
        <div className="space-x-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="badge badge-outline rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <h2 className="text-5xl font-bold">{post.title}</h2>
      <h3 className="text-2xl font-bold">{post.excerpt}</h3>
      <article className="whitespace-pre-wrap">
        <p>{post.content}</p>
      </article>
    </main>
  );
};

export default PostPage;
