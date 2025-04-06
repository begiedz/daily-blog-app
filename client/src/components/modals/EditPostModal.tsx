import { useEffect, useState } from 'react';
import { getPost } from '../../api/postsApi';
import Alert from '../Alert';

interface PostToSend {
  imgUrl: string;
  title: string;
  author: string;
  createdAt: string;
  excerpt: string;
  content: string;
  tags: string[];
}

//excerpt to remake

const EditPostModal = ({ slug }: { slug: string | null }) => {
  const [post, setPost] = useState<PostToSend | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const postData = await getPost(slug);
        setPost(postData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleUpdatePost = () => {
    // logic here
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <Alert variant="ERROR">{error}</Alert>;

  return (
    <dialog
      id="edit-post-modal"
      className="modal"
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">Edit {post?.title}</h3>
        <div className="">
          <form
            onSubmit={handleUpdatePost}
            className="fieldset max-w-full p-10"
          >
            <div>
              <label className="fieldset-label">Title</label>
              <input
                type="text"
                placeholder="Title of post"
                value={post?.title || ''}
                onChange={e =>
                  setPost({ ...post, title: e.target.value } as PostToSend)
                }
                required
                minLength={3}
                maxLength={25}
                className="input validator w-full"
              />
              <p className="validator-hint hidden">
                Must be between 3 to 25 characters.
              </p>
            </div>

            <div>
              <label className="fieldset-label">Excerpt</label>
              <input
                type="text"
                placeholder="Short summary of your post..."
                value={post?.content.substring(0, 100) || ''}
                onChange={e =>
                  setPost({ ...post, content: e.target.value } as PostToSend)
                }
                required
                minLength={3}
                maxLength={100}
                className="input validator w-full"
              />
              <p className="validator-hint hidden">
                Must be between 3 to 100 characters.
              </p>
            </div>

            <div>
              <label className="fieldset-label">Tags</label>
              <input
                type="text"
                placeholder="Food, Travel, Sport..."
                value={post?.tags.join(', ')}
                onChange={e =>
                  setPost({
                    ...post,
                    tags: e.target.value.split(',').map(tag => tag.trim()),
                  } as PostToSend)
                }
                required
                className="input w-full"
              />
              <label className="fieldset-label opacity-50">
                Separate tags with commas
              </label>
            </div>

            <div>
              <label className="fieldset-label">Cover Image</label>
              <input
                type="file"
                className="file-input w-full"
              />
              <label className="fieldset-label opacity-50">
                Max size 2MB | WORK IN PROGRESS
              </label>
            </div>
            <div>
              <label className="fieldset-label">Content</label>
              <textarea
                placeholder="Today I wanted to tell you how awesome my new post is..."
                value={post?.content || ''}
                onChange={e =>
                  setPost({ ...post, content: e.target.value } as PostToSend)
                }
                required
                minLength={3}
                maxLength={5000}
                className="input validator h-40 w-full p-2 text-wrap"
              />
              <p className="validator-hint hidden">
                Must be at least 3 characters. Max 5000.
              </p>
            </div>

            <input
              type="submit"
              value="Update"
              className="btn btn-info"
            />
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default EditPostModal;
