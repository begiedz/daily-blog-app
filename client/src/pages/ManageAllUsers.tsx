import { useEffect, useState } from 'react';
import { getAllUsers } from '../api/usersApi';
import EditUserModal from '../components/modals/EditUserModal';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const ManageAllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    const modal = document.getElementById('edit-user-modal');
    if (modal) (modal as HTMLDialogElement).showModal();
  };

  // const updateUser = (updatedUser: User) => {
  //   setUsers(
  //     users.map(user => (user.id === updatedUser.id ? updatedUser : user)),
  //   );
  // };

  return (
    <main>
      <h2 className="mb-4 text-center text-4xl font-bold">Manage Users</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User, i) => (
            <tr key={i}>
              <td className="font-medium">{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="flex flex-wrap gap-2">
                <button
                  onClick={() => openEditModal(user)}
                  className="btn btn-warning flex-1"
                >
                  Edit
                </button>
                <button className="btn btn-error flex-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          // updateUser={updateUser}
        />
      )}
    </main>
  );
};

export default ManageAllUsers;
