const Create = () => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Create New Post</h2>
      <form className="fieldset w-md max-w-full bg-base-200 border border-base-300 p-8 rounded-box">

        <label className="fieldset-label">Title</label>
        <input type="text" className="input" placeholder="My post" />

        <label className="fieldset-label">Subject</label>
        <input type="text" className="input" placeholder="My post is awesome!" />

        <label className="fieldset-label">Cover Image</label>
        <input type="file" className="file-input" />
        <label className="fieldset-label opacity-50">Max size 2MB</label>

        <label className="fieldset-label">Text</label>
        <textarea className="input text-wrap w-full h-40 p-2" placeholder="Today I wanted to tell you how awesome my new post is..."></textarea>

        <input className="btn btn-primary" type="submit" value="Send" />
      </form>
    </>
  )
}

export default Create