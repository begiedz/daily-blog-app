import { IPost } from '../types';

const HeroPost = ({
  imgUrl,
  title,
  author,
  createdAt,
  excerpt,
  tags,
}: IPost) => {
  return (
    <div className="card relative z-0 h-90 overflow-hidden shadow-sm">
      <img
        src={imgUrl || '/no-image.jpg'}
        alt={`${title || 'Post'} image`}
        className="absolute h-full w-full object-cover"
      />
      <div className="bg-base-100/70 z-10 h-full w-full">
        <div className="card-body absolute bottom-0 z-10 h-1/2 w-full">
          <p className="font-bold">
            {author} • {new Date(createdAt).toLocaleDateString()}
          </p>
          <h3 className="card-title text-xl">{title}</h3>
          <p>{excerpt}</p>
          <div className="space-x-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="badge badge-outline badge-white rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPost;
