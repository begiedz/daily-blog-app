import { useState } from 'react';
import { sendPost } from '../api/postsApi';
import { useNavigate } from 'react-router-dom';
import { arrayFromString, createSlug } from '../utils';
import { handleApiNotify } from '../api/utils';
import clsx from 'clsx';

const Create = () => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>();
  const [tags, setTags] = useState<string[]>([]);

  const [titleError, setTitleError] = useState('');
  const [tagsError, setTagsError] = useState('');

  const navigate = useNavigate();

  const handleSetTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    const newTags = arrayFromString(input);
    setTags(newTags);

    if (newTags.length === 0) {
      setTagsError('Add at least 1 tag');
    } else if (newTags.length > 3) {
      setTagsError('Max 3 tags');
    } else if (newTags.some(tag => tag.length > 20)) {
      setTagsError("Tags can't have more than 20 characters");
    } else {
      setTagsError('');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);

    const validCharCount = (value.match(/[A-Za-z0-9]/g) || []).length;

    if (validCharCount < 3) {
      setTitleError('Title must contain at least 3 letters or numbers.');
    } else if (value.trim().length > 25) {
      setTitleError('Title must be at most 25 characters long.');
    } else {
      setTitleError('');
    }
  };

  const handleSendPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (titleError) return;

    const generatedSlug = createSlug(title);

    const formData = new FormData();
    formData.append('slug', generatedSlug);
    formData.append('title', title);
    formData.append('excerpt', excerpt);
    formData.append('content', content);
    if (imageFile) formData.append('image', imageFile);
    tags.forEach(tag => formData.append('tags', tag));

    try {
      const res = await sendPost(formData);
      handleApiNotify(res);
      navigate('/');
    } catch (err) {
      handleApiNotify(err);
    }
  };

  return (
    <main>
      <h2 className="mb-4 hidden text-center text-3xl font-bold sm:block">
        Create New Post
      </h2>
      <form
        onSubmit={handleSendPost}
        className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md border p-10"
      >
        <div>
          <label className="fieldset-label">Title</label>
          <input
            type="text"
            placeholder="Title of post"
            value={title}
            onChange={handleTitleChange}
            required
            minLength={3}
            maxLength={25}
            className={clsx(
              'input validator w-full',
              titleError && 'input-error',
            )}
          />
          {titleError && <p className="text-error mt-1">{titleError}</p>}
          <p className="validator-hint hidden">
            Must be between 3 to 25 characters.
          </p>
        </div>

        <div>
          <label className="fieldset-label">Excerpt</label>
          <input
            type="text"
            placeholder="Short summary of your post..."
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
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
            onChange={handleSetTags}
            required
            className="input w-full"
          />
          <label className="fieldset-label opacity-50">
            Separate tags with commas
          </label>
          {tagsError && <p className="text-error">{tagsError}</p>}
        </div>

        <div>
          <label className="fieldset-label">Cover Image</label>
          <input
            type="file"
            onChange={handleFileInput}
            className="file-input w-full"
          />
          <label className="fieldset-label opacity-50">Max size 2MB</label>
        </div>

        <div>
          <label className="fieldset-label">Content</label>
          <textarea
            placeholder="Today I wanted to tell you how awesome my new post is..."
            value={content}
            onChange={e => setContent(e.target.value)}
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
          value="Publish"
          className="btn btn-primary mt-4"
        />
      </form>
    </main>
  );
};

export default Create;
