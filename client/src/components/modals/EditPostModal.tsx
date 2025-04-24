import { useEffect, useState } from 'react';
import { getPost, updatePost } from '../../api/postsApi';
import FadeLoader from 'react-spinners/FadeLoader';
import { IPost } from '../../types';
import { createSlug } from '../../utils';
import { handleApiNotify } from '../../api/utils';

interface EditPostModalProps {
  post: IPost | null;
}

const EditPostModal = ({ post }: EditPostModalProps) => {
  const [postToUpdate, setPostToUpdate] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!post) return;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const postData = await getPost(post.slug);
        setPostToUpdate(postData);
      } catch (err) {
        handleApiNotify(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [post]);

  const handleUpdatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!postToUpdate) return;

    try {
      const updatedPost = await updatePost(postToUpdate.id, postToUpdate);
      handleApiNotify({ status: 200, message: updatedPost.message });
      (
        document.getElementById('edit-post-modal') as HTMLDialogElement
      )?.close();
    } catch (err) {
      handleApiNotify(err);
    }
  };

  return (
    <dialog
      id="edit-post-modal"
      className="modal"
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">Editing {post?.title || '...'}</h3>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
            ✕
          </button>
        </form>

        {loading || !postToUpdate ? (
          <div className="flex justify-center py-10">
            <FadeLoader />
          </div>
        ) : (
          <form
            onSubmit={handleUpdatePost}
            className="fieldset max-w-full p-10"
          >
            <div>
              <label className="fieldset-label">Title</label>
              <input
                type="text"
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
            </div>

            <div>
              <label className="fieldset-label">Slug</label>
              <input
                type="text"
                value={postToUpdate.slug}
                disabled
                className="input validator w-full"
              />
            </div>

            <div>
              <label className="fieldset-label">Excerpt</label>
              <input
                type="text"
                value={postToUpdate.excerpt}
                onChange={e =>
                  setPostToUpdate({
                    ...postToUpdate,
                    excerpt: e.target.value,
                  })
                }
                required
                minLength={3}
                maxLength={100}
                className="input validator w-full"
              />
            </div>

            <div>
              <label className="fieldset-label">Tags</label>
              <input
                type="text"
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
            </div>

            <div>
              <label className="fieldset-label">Content</label>
              <textarea
                value={postToUpdate.content}
                onChange={e =>
                  setPostToUpdate({
                    ...postToUpdate,
                    content: e.target.value,
                  })
                }
                required
                minLength={3}
                maxLength={5000}
                className="input validator h-40 w-full p-2 text-wrap"
              />
            </div>

            <input
              type="submit"
              value="Update"
              className="btn btn-info"
            />
          </form>
        )}
      </div>
    </dialog>
  );
};

export default EditPostModal;
