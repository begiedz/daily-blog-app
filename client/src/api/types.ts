export interface IPost {
  slug: string;
  title: string;
  imgUrl: string;
  createdAt: string;
  content?: string;
  excerpt?: string;
  tags: string[];
  author: string;
}
