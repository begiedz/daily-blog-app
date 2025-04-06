import { useStore } from '@tanstack/react-store';
import { postsStore } from '../store/postStore';
import { IPostPreview } from '../store/types';
import EditPostModal from '../components/modals/EditPostModal';
import DeleteModal from '../components/modals/DeleteModal';

const ManageAllPosts = () => {
  const posts = useStore(postsStore);

  const openEditModal = () => {
    const modal = document.getElementById('edit-post-modal');
    if (modal) (modal as HTMLDialogElement).showModal();
  };
  const openDeleteModal = () => {
    const modal = document.getElementById('delete-modal');
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
          {posts.map((post: IPostPreview, i) => (
            <tr key={i}>
              <td className="font-medium">{post.title}</td>
              <td>{post.author}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
              <td className="flex flex-wrap gap-2">
                <button
                  onClick={openEditModal}
                  className="btn btn-warning flex-1"
                >
                  Edit
                </button>
                <button
                  onClick={openDeleteModal}
                  className="btn btn-error flex-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditPostModal />
      <DeleteModal />
    </main>
  );
};

export default ManageAllPosts;
