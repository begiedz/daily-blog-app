import { useState, useEffect } from 'react';
import { getAllUsers } from '../api/usersApi';
import { getAllPosts } from '../api/postsApi';
import { IPost } from '../api/types';
import { TRole } from '../store/types';
import { ERole } from '../store/types';
import { Link } from 'react-router-dom';
import { capitalize } from '../utils';

interface IUser {
  id: number;
  name: string;
  email: string;
  role: TRole;
}

const { ADMIN, AUTHOR } = ERole;

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="card bg-base-200 p-4 text-center shadow-sm">
    <div className="text-lg font-bold">{label}</div>
    <div className="text-3xl">{value}</div>
  </div>
);

const AdminPanel = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    getAllUsers()
      .then(data => setUsers(data))
      .catch(error => console.error('Failed to fetch users:', error));

    getAllPosts()
      .then(data => setPosts(data))
      .catch(error => console.error('Failed to fetch posts:', error));
  }, []);

  const statCards = [
    { label: 'Total Posts', value: posts.length },
    { label: 'Total Users', value: users.length },
    {
      label: 'Authors',
      value: users.filter(user => user.role === AUTHOR).length,
    },
    {
      label: 'Admins',
      value: users.filter(user => user.role === ADMIN).length,
    },
  ];

  const latestUsers = users.slice(0, 5).reverse();
  const recentPosts = posts.slice(0, 5);

  return (
    <main className="space-y-8 p-6">
      <h2 className="text-center text-4xl font-bold">Admin Panel</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {statCards.map(stat => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-2 text-xl font-semibold">Latest Users</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {latestUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{capitalize(user.role)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Recent Posts</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post: IPost, i) => (
                  <tr key={i}>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <ul className="list bg-base-200 rounded-box divide-base-300 divide-y shadow-md">
          <li className="p-4 text-sm font-medium tracking-wider text-gray-500 uppercase">
            Management Panel
          </li>
          <li className="hover:bg-base-300 cursor-pointer p-4">
            <Link
              to="/panel/posts"
              className="block h-full w-full"
            >
              Manage Posts
            </Link>
          </li>
          <li className="hover:bg-base-300 cursor-pointer p-4">
            <Link
              to="/panel/users"
              className="block h-full w-full"
            >
              Manage Users
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default AdminPanel;
