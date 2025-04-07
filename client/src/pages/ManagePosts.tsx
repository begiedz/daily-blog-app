import { useState, useEffect } from 'react';
import { getAllPosts } from '../api/postsApi';
import { IPost } from '../api/types';
import EditPostModal from '../components/modals/EditPostModal';
// import DeleteModal from '../components/modals/DeleteModal';

const ManageAllPosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  useEffect(() => {
    getAllPosts()
      .then(data => setPosts(data))
      .catch(error => console.error('Failed to fetch posts:', error));
  }, []);

  const openModal = (id: string, slug: string) => {
    setSelectedSlug(slug);
    const modal = document.getElementById(id);
    if (modal) (modal as HTMLDialogElement).showModal();
  };

  return (
    <main>
      <h2 className="mb-4 text-center text-4xl font-bold">Manage Posts</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: IPost, i) => (
            <tr key={i}>
              <td className="font-medium">{post.title}</td>
              <td>{post.author}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
              <td className="flex flex-wrap gap-2">
                <button
                  onClick={() => openModal('edit-post-modal', post.slug)}
                  className="btn flex-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => openModal('delete-modal', post.slug)}
                  className="btn btn-error flex-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditPostModal slug={selectedSlug} />
      {/* <DeleteModal slug={selectedSlug} /> */}
    </main>
  );
};

export default ManageAllPosts;
