import { authStore } from '../store/authStore'

const Profile = () => {
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
        <p>Not logged in</p>
      )}
    </div>
  )
}

export default Profile
