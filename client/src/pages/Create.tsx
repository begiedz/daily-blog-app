const Create = () => {
  return (
    <>
      <h2 className='mb-4 text-3xl font-bold'>Create New Post</h2>
      <form className='fieldset bg-base-200 border-base-300 rounded-box w-md max-w-full border p-8'>
        <label className='fieldset-label'>Title</label>
        <input
          type='text'
          className='input'
          placeholder='My post'
        />

        <label className='fieldset-label'>Subject</label>
        <input
          type='text'
          className='input'
          placeholder='My post is awesome!'
        />

        <label className='fieldset-label'>Cover Image</label>
        <input
          type='file'
          className='file-input'
        />
        <label className='fieldset-label opacity-50'>Max size 2MB</label>

        <label className='fieldset-label'>Text</label>
        <textarea
          className='input h-40 w-full p-2 text-wrap'
          placeholder='Today I wanted to tell you how awesome my new post is...'
        ></textarea>

        <input
          className='btn btn-primary'
          type='submit'
          value='Send'
        />
      </form>
    </>
  );
};

export default Create;
