import { Link } from 'react-router-dom'
import { authStore } from '../store/authStore'

interface IProfileProps {
  setIsChecked: (isChecked: boolean) => void
}

const Profile = ({ setIsChecked }: IProfileProps) => {
  const { user } = authStore.state

  const handleLogout = () => {
    authStore.setState(prevState => ({
      ...prevState,
      user: null,
      isAuthenticated: false,
    }))
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <div>
      {user ? (
        <div className="flex items-center justify-between gap-4">
          <p>
            Logged in as <span className="font-bold">{user.username}</span>
          </p>
          <button
            onClick={handleLogout}
            className="btn bg-base-content text-base-100"
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <p>Not logged in</p>
          <Link
            to={'/login'}
            onClick={() => setIsChecked(false)}
            className="btn bg-base-content text-base-100"
          >
            Log in
          </Link>
        </div>
      )}
    </div>
  )
}

export default Profile
