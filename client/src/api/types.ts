export interface IPost {
  slug: string;
  title: string;
  createdAt: string;
  content?: string;
  excerpt?: string;
  tags: string[];
  author: string;
}
