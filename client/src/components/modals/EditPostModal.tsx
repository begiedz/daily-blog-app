import { useEffect, useState } from 'react';
import { getPost, updatePost } from '../../api/postsApi';
import FadeLoader from 'react-spinners/FadeLoader';
import { IPost } from '../../types';
import { closeModal, createSlug } from '../../utils';
import { handleApiNotify } from '../../api/utils';

interface EditPostModalProps {
  post: IPost | null;
}

const EditPostModal = ({ post }: EditPostModalProps) => {
  const [postToUpdate, setPostToUpdate] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string>('');

  const [titleError, setTitleError] = useState('');
  const [tagsError, setTagsError] = useState('');

  useEffect(() => {
    if (!post) return;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const postData = await getPost(post.slug);

        setPostToUpdate(postData);
        setTags(postData.tags.join(', '));
        handleApiNotify(postData);
      } catch (err) {
        handleApiNotify(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [post]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!postToUpdate) return;

    setPostToUpdate({
      ...postToUpdate,
      title: value,
    });

    // check if title has at least 3 letters or numbers
    const validCharCount = (value.match(/[A-Za-z0-9]/g) || []).length;

    if (validCharCount < 3) {
      setTitleError('Title must contain at least 3 letters or numbers.');
    } else if (value.trim().length > 25) {
      setTitleError('Title must be at most 25 characters long.');
    } else {
      setTitleError('');
    }
  };

  const handleSetTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    setTags(input);

    const tagsArray = input.split(',').map(tag => tag.trim());
    if (tagsArray.length === 0) {
      setTagsError('Add at least 1 tag');
    } else if (tagsArray.length > 3) {
      setTagsError('Max 3 tags');
    } else if (tagsArray.some(tag => tag.length > 20)) {
      setTagsError("Tags can't have more than 20 characters");
    } else {
      setTagsError('');
    }
  };

  const handleUpdatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!postToUpdate || titleError || tagsError) return;

    try {
      const updatedTags = tags.split(',').map(tag => tag.trim());

      const updatedPost = await updatePost(postToUpdate.id, {
        ...postToUpdate,
        tags: updatedTags,
      });

      handleApiNotify(updatedPost);
      closeModal('edit-post-modal');
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
                onChange={handleTitleChange}
                required
                minLength={3}
                maxLength={25}
                className={`input validator w-full ${
                  titleError ? 'input-error' : ''
                }`}
              />
              {titleError && <p className="text-error mt-1">{titleError}</p>}
            </div>

            <div>
              <label className="fieldset-label">Slug</label>
              <input
                type="text"
                value={`${createSlug(postToUpdate.title)}-${postToUpdate.id}`}
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
              <p className="validator-hint hidden">
                Must be between 3 to 100 characters.
              </p>
            </div>

            <div>
              <label className="fieldset-label">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={handleSetTags}
                required
                className={`input w-full ${tagsError ? 'input-error' : ''}`}
              />
              <label className="fieldset-label opacity-50">
                Separate tags with commas
              </label>
              {tagsError && <p className="text-error">{tagsError}</p>}
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
        )}
      </div>
    </dialog>
  );
};

export default EditPostModal;
