const Create = () => {
  return (
    <main>
      <h2 className="mb-4 text-center text-3xl font-bold">Create Post</h2>
      <form className="fieldset bg-base-200 border-base-300 rounded-box w-md max-w-full border p-10">
        <label className="fieldset-label">Title</label>
        <input
          type="text"
          placeholder="My post"
          className="input w-full"
        />

        <label className="fieldset-label">Subject</label>
        <input
          type="text"
          placeholder="My post is awesome!"
          className="input w-full"
        />

        <label className="fieldset-label">Tags</label>
        <input
          type="text"
          placeholder="Food, Travel, Sport..."
          className="input w-full"
        />
        <label className="fieldset-label opacity-50">
          Separate tags with commas
        </label>

        <label className="fieldset-label">Cover Image</label>
        <input
          type="file"
          className="file-input w-full"
        />
        <label className="fieldset-label opacity-50">Max size 2MB</label>

        <label className="fieldset-label">Content</label>
        <textarea
          placeholder="Today I wanted to tell you how awesome my new post is..."
          className="input h-40 w-full p-2 text-wrap"
        ></textarea>

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
