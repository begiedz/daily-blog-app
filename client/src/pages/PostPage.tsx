import { useParams } from 'react-router-dom';
import { getPost } from '../api/postsApi';
import { useEffect, useState } from 'react';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h2>{post.title}</h2>
      <img
        src={post.imgUrl}
        alt="Title image"
      />
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
      <article>
        <p>{post.content}</p>
      </article>
    </main>
  );
};

export default PostPage;
