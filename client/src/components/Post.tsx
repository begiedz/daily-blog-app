interface IPostProps {
  imgUrl: string;
  title: string;
  author: string;
  createdAt: string;
  excerpt: string;
  tags: string[];
}

const Post = ({
  imgUrl = 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
  title = 'Post Title',
  author = 'Author',
  createdAt = '2014-11-03T19:38:34.203Z',
  excerpt = 'A card component has a figure, a body part, and inside body there are title and actions parts',
  tags = ['Food', 'Travel'],
}: IPostProps) => {
  return (
    <div className='card bg-base-100 w-96 shadow-sm'>
      <figure className='h-45 w-full'>
        <img
          src={imgUrl}
          alt='Post image'
          className='h-full w-full object-cover'
        />
      </figure>
      <div className='card-body'>
        <p className='font-bold'>
          {author} • {new Date(createdAt).toLocaleDateString()}
        </p>
        <h3 className='card-title text-xl'>{title}</h3>
        <p>{excerpt}</p>
        <div className='space-x-2'>
          {tags.map((tag, index) => (
            <span
              key={index}
              className='badge badge-outline badge-neutral rounded-full'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
