import { useState, useEffect } from 'react';
import Alert from '../Alert';
import { updateUserRole } from '../../api/usersApi';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface EditUserModalProps {
  user: User;
  // updateUser: (updatedUser: User) => void;
}

const EditUserModal = ({ user }: EditUserModalProps) => {
  const [userToUpdate, setUserToUpdate] = useState<User>(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // reset userToUpdate whenever the user prop changes
  // without this useEffect the credentials of previous user stays
  useEffect(() => {
    setUserToUpdate(user);
  }, [user]);

  const handleRoleChange = async (newRole: string) => {
    setLoading(true);
    try {
      setUserToUpdate({ ...userToUpdate, role: newRole });
      await updateUserRole(userToUpdate.id, newRole);
    } catch (err) {
      if (err instanceof Error) {
        setError('Failed to update role.');
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <Alert variant="ERROR">{error}</Alert>;

  return (
    <dialog
      id="edit-user-modal"
      className="modal"
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">Edit {userToUpdate.name}</h3>
        <form className="fieldset max-w-full p-10">
          <div>
            <label className="fieldset-label">Name</label>
            <input
              type="text"
              value={userToUpdate.name}
              disabled
              className="input w-full"
            />
          </div>
          <div>
            <label className="fieldset-label">Email</label>
            <input
              type="email"
              value={userToUpdate.email}
              disabled
              className="input w-full"
            />
          </div>
          <div>
            <label className="fieldset-label">Role</label>
            <select
              value={userToUpdate.role}
              onChange={e => handleRoleChange(e.target.value)}
              required
              className="select w-full"
            >
              <option value="user">User</option>
              <option value="author">Author</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditUserModal;
