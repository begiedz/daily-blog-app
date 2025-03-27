import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginRequest } from '../api/authApi'
import { loginUser } from '../store/authStore'

const Login = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const { token, user } = await loginRequest(username, password)
      loginUser(user, token)
      navigate('/')
    } catch (error) {
      setError(`${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault()
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-4">{isRegister ? 'Register' : 'Log in'}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={isRegister ? handleRegister : handleLogin}
        className="fieldset w-md max-w-full bg-base-200 border border-base-300 p-8 rounded-box"
      >
        {isRegister && (
          <div>
            <label className="fieldset-label">E-mail</label>
            <input
              type="email"
              placeholder="admin@admin.blog"
              required
              value={email}
              onChange={event => setEmail(event.target.value)}
              className="input validator w-full"
            />
            <div className="validator-hint">Enter valid email</div>
          </div>
        )}
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
            value={password}
            onChange={event => setPassword(event.target.value)}
            className="input validator w-full"
          />
          <div className="validator-hint">Enter valid password</div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {isRegister ? 'Register' : 'Log in'}
        </button>
      </form>
      <p>
        {(isRegister ? "Don't have an account?" : 'Already have an account?') + ' '}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="link"
        >
          {isRegister ? 'Log in' : 'Register'}
        </button>
      </p>
    </>
  )
}

export default Login
