interface IPostProps {
  slug: string;
  imgUrl: string;
  title: string;
  author: string;
  createdAt: string;
  excerpt: string;
  tags: string[];
}

const Post = ({
  imgUrl,
  title,
  author,
  createdAt,
  excerpt,
  tags,
}: IPostProps) => {
  return (
    <div className="card bg-base-200 h-90 shadow-sm">
      <figure className="h-30 w-full">
        <img
          src={imgUrl}
          alt={`${title} image`}
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <p className="font-bold">
          {author} • {new Date(createdAt).toLocaleDateString()}
        </p>
        <h3 className="card-title text-xl">{title}</h3>
        <p>{excerpt}</p>
        <div className="space-x-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="badge badge-outline rounded-full"
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
