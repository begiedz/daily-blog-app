import { useParams } from 'react-router-dom';
import { getPost } from '../api/postsApi';
import { useEffect, useState } from 'react';
import Alert from '../components/Alert';
import FadeLoader from 'react-spinners/FadeLoader';

interface Post {
  imgUrl: string;
  title: string;
  author: string;
  createdAt: string;
  content: string;
  tags: string[];
}

const PostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleFetchPost = async (slug: string) => {
    try {
      const postData = await getPost(slug);
      console.log(postData);
      setPost(postData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
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
  if (error) return <Alert variant="ERROR">{error}</Alert>;
  if (!post) return <Alert variant="ERROR">Post not found.</Alert>;

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-2">
      <h2 className="text-center text-4xl font-bold">{post.title}</h2>
      <img
        src={post?.imgUrl || '/no-image.jpg'}
        alt={`${post?.title || 'Post'} image`}
        className="card h-60 w-full border object-cover"
      />
      <div>
        <p className="font-bold">
          {post.author} • {new Date(post.createdAt).toLocaleDateString()}
        </p>
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
      <article>
        <p>{post.content}</p>
      </article>
    </main>
  );
};

export default PostPage;
