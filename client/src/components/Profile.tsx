import { authStore } from '../store/authStore'

const Profile = () => {
  const { user } = authStore.state

  return (
    <div>
      {user ? (
        <p className='font-bold'>{user.username}</p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  )
}

export default Profile
