import { useEffect, useState } from 'react';
import { getAllUsers, deleteUser as deleteUserApi } from '../api/usersApi';
import EditUserModal from '../components/modals/EditUserModal';
import DeleteModal from '../components/modals/DeleteModal';
import { capitalize, openModal } from '../utils';
import { IUser } from '../types';

const ManageAllUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getAllUsers();
      //set users and prevent Admin to self edit
      setUsers(usersData.filter((user: IUser) => user.name !== 'Admin'));
    };
    fetchUsers();
  }, []);

  const deleteUser = async (userId: number) => {
    try {
      await deleteUserApi(userId);
      setUsers(users.filter(user => user.id !== userId));
      setUserToDelete(null);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

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
          {users.map((user: IUser, i) => (
            <tr key={i}>
              <td className="font-medium">{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{capitalize(user.role)}</td>
              <td className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    openModal('edit-user-modal', user, setSelectedUser)
                  }
                  className="btn flex-1"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    openModal('edit-user-modal', user, setSelectedUser)
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
      <EditUserModal user={selectedUser} />

      <DeleteModal
        name={userToDelete?.name ?? null}
        onDelete={() => deleteUser(userToDelete!.id)}
      />
    </main>
  );
};

export default ManageAllUsers;
