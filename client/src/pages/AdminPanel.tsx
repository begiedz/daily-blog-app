import { postsStore } from '../store/postStore';
import { useStore } from '@tanstack/react-store';
import { IPostPreview } from '../store/types';

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="card bg-base-200 p-4 text-center shadow-sm">
    <div className="text-lg font-bold">{label}</div>
    <div className="text-3xl">{value}</div>
  </div>
);

const AdminPanel = () => {
  const posts = useStore(postsStore);

  const statCards = [
    { label: 'Total Posts', value: posts.length },
    { label: 'Total Users', value: 0 },
    { label: 'Authors', value: 0 },
  ];

  const latestUsers = [
    // { id: 1, email: 'jan@dev.pl', role: 'AUTHOR', registered: '2024-04-01' },
    // { id: 2, email: 'admin@xyz.com', role: 'ADMIN', registered: '2024-03-28' },
  ];

  const recentPosts = posts.slice(0, 5);

  return (
    <main className="space-y-8 p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3">
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
                  <th>Email</th>
                  <th>Role</th>
                  <th>Registered</th>
                </tr>
              </thead>
              <tbody>
                {latestUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.registered}</td>
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
                {recentPosts.map((post: IPostPreview, i) => (
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
        <h2 className="mb-4 text-xl font-semibold">Management Panel</h2>
        <ul className="list bg-base-200 rounded-box divide-base-300 divide-y shadow-md">
          <li className="p-4 text-sm font-medium tracking-wider text-gray-500 uppercase">
            Manager
          </li>
          <li className="hover:bg-base-300 cursor-pointer p-4">Manage Posts</li>
          <li className="hover:bg-base-300 cursor-pointer p-4">Manage Users</li>
        </ul>
      </div>
    </main>
  );
};

export default AdminPanel;
