import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginRequest } from '../api/authApi'
import { loginUser } from '../store/authStore'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const { token, user } = await loginRequest(username, password)
      loginUser(user, token)
      navigate('/')
    } catch (error) {
      setError(`${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Log in</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="fieldset w-md max-w-full bg-base-200 border border-base-300 p-8 rounded-box"
      >
        <div>
          <label className="fieldset-label">Username</label>
          <input
            type="text"
            placeholder="Admin"
            required
            value={username}
            onChange={event => setUsername(event.target.value)}
            className="input validator w-full"
          />
          <div className="validator-hint">Enter valid username</div>
        </div>
        <div>
          <label className="fieldset-label">Password</label>
          <input
            type="password"
            placeholder="Password"
            required
            value={username}
            onChange={event => setPassword(event.target.value)}
            className="input validator w-full"
          />
          <div className="validator-hint">Enter valid password</div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>
      </form>
    </>
  )
}

export default Login
