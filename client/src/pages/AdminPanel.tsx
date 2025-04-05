const statCards = [
  { label: 'Total Posts', value: 7 },
  { label: 'Total Users', value: 5 },
  { label: 'Authors', value: 2 },
  { label: 'Total Comments', value: 15 },
];

const latestUsers = [
  { id: 1, email: 'jan@dev.pl', role: 'AUTHOR', registered: '2024-04-01' },
  { id: 2, email: 'admin@xyz.com', role: 'ADMIN', registered: '2024-03-28' },
];

const recentPosts = [
  {
    title: 'Pierwszy post',
    author: 'jan@dev.pl',
    date: '2024-04-03',
  },
  {
    title: 'Drugi post',
    author: 'admin@xyz.com',
    date: '2024-04-01',
  },
];

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="card bg-base-200 p-4 text-center shadow-sm">
    <div className="text-lg font-bold">{label}</div>
    <div className="text-3xl">{value}</div>
  </div>
);

const AdminPanel = () => {
  return (
    <div className="space-y-8 p-6">
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
                {recentPosts.map((post, idx) => (
                  <tr key={idx}>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.date}</td>
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
          <li className="hover:bg-base-300 cursor-pointer p-4">App Settings</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
