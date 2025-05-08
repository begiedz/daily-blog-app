import { useState, useEffect } from 'react';
import { getAllPosts, deletePost as deletePostApi } from '../api/postsApi';
import { IPost } from '../types';
import EditPostModal from '../components/modals/EditPostModal';
import { Link } from 'react-router-dom';
import DeleteModal from '../components/modals/DeleteModal';
import { closeModal, openModal } from '../utils';
import { handleApiNotify } from '../api/utils';

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

  const updatePostInState = (updatedPost: IPost) => {
    setPosts(prevPosts =>
      prevPosts.map(post => (post.id === updatedPost.id ? updatedPost : post)),
    );
  };

  const deletePost = async (postId: number) => {
    try {
      const res = await deletePostApi(postId);
      setPosts(posts.filter(post => post.id !== postId));
      setPostToDelete(null);
      closeModal('delete-modal');
      handleApiNotify(res);
    } catch (err) {
      handleApiNotify(err);
    }
  };

  return (
    <main>
      <h2 className="mb-4 text-center text-4xl font-bold">Manage Posts</h2>
      <table className="table w-full text-xs sm:text-base">
        <thead>
          <tr>
            <th className="hidden sm:block">Image</th>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: IPost, i) => (
            <tr key={i}>
              <td className="hidden items-center sm:block">
                <img
                  src={post.imageUrl || '/no-image.jpg'}
                  alt={`${post.title || 'Post'} image`}
                  loading="lazy"
                  className="max-h-12 w-auto rounded"
                />
              </td>
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
                  onClick={() =>
                    openModal('edit-post-modal', post, setSelectedPost)
                  }
                  className="btn flex-1"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    openModal('delete-modal', post, setPostToDelete)
                  }
                  className="btn btn-error flex-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditPostModal
        post={selectedPost}
        onUpdate={updatePostInState}
      />

      <DeleteModal
        name={postToDelete?.title ?? null}
        onDelete={() => deletePost(postToDelete!.id)}
      />
    </main>
  );
};

export default ManageAllPosts;
