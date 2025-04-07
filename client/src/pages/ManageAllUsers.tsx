import { useEffect, useState } from 'react';
import { getAllUsers } from '../api/usersApi';
// import EditUserModal from '../components/modals/EditPostModal';
// import DeleteModal from '../components/modals/DeleteModal';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const ManageAllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getAllUsers();
      console.log(usersData);
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  // const openModal = (id: string) => {
  //   const modal = document.getElementById(id);
  //   if (modal) (modal as HTMLDialogElement).showModal();
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
                  // onClick={() => openModal('edit-user-modal', user.id)}
                  className="btn btn-warning flex-1"
                >
                  Edit
                </button>
                <button
                  // onClick={() => openModal('delete-modal', user.id)}
                  className="btn btn-error flex-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <EditUserModal id={selectedSlug} /> */}
      {/* <DeleteModal slug={selectedSlug} /> */}
    </main>
  );
};

export default ManageAllUsers;
