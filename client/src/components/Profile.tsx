import { authStore } from '../store/authStore'

const Profile = () => {
  const { user } = authStore.state

  return (
    <div>
      {user ? (
        <div>
          <p>
            Logged in as <span className="font-bold">{user.username}</span>
          </p>
          <button className="btn"></button>
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  )
}

export default Profile
