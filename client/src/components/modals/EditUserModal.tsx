import { useState, useEffect } from 'react';
import { updateUserRole } from '../../api/usersApi';
import { ERole, IUser } from '../../types';
import { capitalize, closeModal } from '../../utils/';
import FadeLoader from 'react-spinners/FadeLoader';
import { handleApiNotify } from '../../api/utils';

interface EditUserModalProps {
  user: IUser | null;
  onUpdate: (user: IUser) => void;
}

const roles = Object.values(ERole).filter(role => role !== 'guest');

const EditUserModal = ({ user, onUpdate }: EditUserModalProps) => {
  const [userToUpdate, setUserToUpdate] = useState<IUser | null>(user);
  const [loading, setLoading] = useState(false);

  // reset userToUpdate whenever the user prop changes
  // without this useEffect the credentials of previous user stays
  useEffect(() => {
    setUserToUpdate(user);
  }, [user]);

  const handleRoleChange = async (newRole: IUser['role']) => {
    setLoading(true);
    try {
      if (!userToUpdate) return;
      const updatedUser = { ...userToUpdate, role: newRole };
      setUserToUpdate(updatedUser);
      const res = await updateUserRole(userToUpdate.id, newRole);
      handleApiNotify(res);
      onUpdate(updatedUser);
    } catch (err) {
      handleApiNotify(err);
    } finally {
      setLoading(false);
      closeModal('edit-user-modal');
    }
  };

  return (
    <dialog
      id="edit-user-modal"
      className="modal"
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">
          Edit {userToUpdate?.name || '...'}
        </h3>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
            ✕
          </button>
        </form>
        {loading || !userToUpdate ? (
          <div className="flex justify-center py-10">
            <FadeLoader />
          </div>
        ) : (
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
                value={userToUpdate.email || ''}
                disabled
                className="input w-full"
              />
            </div>
            <div>
              <label className="fieldset-label">Role</label>
              <select
                value={userToUpdate.role}
                onChange={e => handleRoleChange(e.target.value as ERole)}
                required
                className="select w-full"
              >
                {roles.map(role => (
                  <option
                    key={role}
                    value={role}
                  >
                    {capitalize(role)}
                  </option>
                ))}
              </select>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
};

export default EditUserModal;
