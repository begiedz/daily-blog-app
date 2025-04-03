const Post = () => {
  return (
    <div className='card bg-base-100 w-96 shadow-sm'>
      <figure>
        <img
          src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
          alt='Shoes'
        />
      </figure>
      <div className='card-body'>
        <p className='font-bold'>Author • 19 Jan 2022</p>
        <h3 className='card-title text-xl'>Post Title</h3>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div>
          <span className='badge badge-outline badge-neutral rounded-full'>
            Badge
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
