import { authStore } from '../store/authStore'

const Profile = () => {
  const { user } = authStore.state

  return (
    <div>
      {user ? (
        <p>
          Logged in as <span className="font-bold">{user.username}</span>
        </p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  )
}

export default Profile
