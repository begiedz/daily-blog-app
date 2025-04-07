import { useState, useEffect } from 'react';
import { getAllPosts, deletePost as deletePostApi } from '../api/postsApi';
import { IPost } from '../types';
import EditPostModal from '../components/modals/EditPostModal';
import { Link } from 'react-router-dom';
import DeleteModal from '../components/modals/DeleteModal';

const ManageAllPosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [postToDelete, setPostToDelete] = useState<IPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getAllPosts();
      setPosts(postsData);
    };
    fetchPosts();
  }, []);

  const openEditModal = (post: IPost) => {
    setSelectedPost(post);
    const modal = document.getElementById('edit-post-modal');
    if (modal) (modal as HTMLDialogElement).showModal();
  };

  const openDeleteModal = (post: IPost) => {
    setPostToDelete(post);
    const modal = document.getElementById('delete-modal');
    if (modal) (modal as HTMLDialogElement).showModal();
  };

  const deletePost = async (postId: number) => {
    try {
      await deletePostApi(postId);
      setPosts(posts.filter(post => post.id !== postId));
      setPostToDelete(null);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
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
              <td className="font-medium">
                <Link
                  to={`/post/${post.slug}`}
                  className="link"
                >
                  {post.title}
                </Link>
              </td>
              <td>{post.author}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
              <td className="flex flex-wrap gap-2">
                <button
                  onClick={() => openEditModal(post)}
                  className="btn flex-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(post)}
                  className="btn btn-error flex-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPost && <EditPostModal post={selectedPost} />}
      {postToDelete && (
        <DeleteModal
          name={postToDelete.title}
          onDelete={() => deletePost(postToDelete.id)}
        />
      )}
    </main>
  );
};

export default ManageAllPosts;
