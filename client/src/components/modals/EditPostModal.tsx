import { useEffect, useState } from 'react';
import { getPost, updatePost } from '../../api/postsApi';
import FadeLoader from 'react-spinners/FadeLoader';
import { IPost } from '../../types';
import { createSlug } from '../../utils';
import { setApiError } from '../../api/utils';

interface EditPostModalProps {
  post: IPost;
}

const EditPostModal = ({ post }: EditPostModalProps) => {
  const [postToUpdate, setPostToUpdate] = useState<IPost>(post);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const postData = await getPost(post.slug);
        setPostToUpdate({ ...postData });
      } catch (err) {
        setApiError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [post.slug]);

  const handleUpdatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedPost = await updatePost(postToUpdate.id, postToUpdate);
      setApiError(updatedPost.message);
    } catch (err) {
      setApiError(err);
    }
  };

  if (loading) return <FadeLoader className="mx-auto" />;

  return (
    <dialog
      id="edit-post-modal"
      className="modal"
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">Editing {post.title}</h3>
        <div>
          <form
            onSubmit={handleUpdatePost}
            className="fieldset max-w-full p-10"
          >
            <div>
              <label className="fieldset-label">Title</label>
              <input
                type="text"
                placeholder="Title of post"
                value={postToUpdate.title}
                onChange={e =>
                  setPostToUpdate({
                    ...postToUpdate,
                    title: e.target.value,
                    slug: createSlug(e.target.value),
                  })
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
              <label className="fieldset-label">Slug</label>
              <input
                type="text"
                placeholder="Title of post"
                value={postToUpdate.slug}
                disabled
                className="input validator w-full"
              />
            </div>

            <div>
              <label className="fieldset-label">Excerpt</label>
              <input
                type="text"
                placeholder="Short summary of your post..."
                value={postToUpdate.excerpt}
                onChange={e =>
                  setPostToUpdate({ ...postToUpdate, content: e.target.value })
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
                value={postToUpdate.tags.join(', ')}
                onChange={e =>
                  setPostToUpdate({
                    ...postToUpdate,
                    tags: e.target.value.split(',').map(tag => tag.trim()),
                  })
                }
                required
                className="input w-full"
              />
              <label className="fieldset-label opacity-50">
                Separate tags with commas
              </label>
            </div>
            <div>
              <label className="fieldset-label">Content</label>
              <textarea
                placeholder="Today I wanted to tell you how awesome my new post is..."
                value={postToUpdate.content}
                onChange={e =>
                  setPostToUpdate({ ...postToUpdate, content: e.target.value })
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
