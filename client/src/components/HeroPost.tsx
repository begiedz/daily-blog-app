import { IPost } from '../types';

const HeroPost = ({
  imageUrl,
  title,
  author,
  createdAt,
  excerpt,
  tags,
}: IPost) => {
  return (
    <div className="card relative h-90 overflow-hidden shadow-sm">
      <img
        src={imageUrl || '/no-image.jpg'}
        alt={`${title || 'Post'} image`}
        className="absolute h-full w-full object-cover opacity-40"
      />
      <div className="card-body absolute bottom-0 w-full">
        <p className="font-bold">
          {author} • {new Date(createdAt).toLocaleDateString()}
        </p>
        <h3 className="card-title text-xl">{title}</h3>
        <p>{excerpt}</p>
        <div className="inline-flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="badge badge-outline badge-white gap-2 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroPost;
