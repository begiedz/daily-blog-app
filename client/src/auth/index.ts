import { jwtDecode } from 'jwt-decode'
import { loginRequest } from '../api/authApi'
import { authStore, setUserState } from '../store/authStore'
import { Role } from '../store/authStore'

interface ITokenPayload {
  unique_name: string
  role: Role
}

interface IUseLoginProps {
  event: React.FormEvent
  username: string
  password: string
  setError: (error: string) => void
}

export const handleLogin = async ({ username, password, setError }: IUseLoginProps) => {
  try {
    const { token } = await loginRequest(username, password)
    const decoded = jwtDecode<ITokenPayload>(token)

    console.log('decoded token', decoded)

    const newUser = {
      username: decoded.unique_name,
      role: decoded.role,
    }
    console.log(newUser)
    setUserState(newUser)
    localStorage.setItem('token', token)
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Unknown error')
  }
}

export const authOnEntry = () => {
  const token = localStorage.getItem('token')
  if (token) {
    const decoded = jwtDecode<ITokenPayload>(token)

    const newUser = {
      username: decoded.unique_name,
      role: decoded.role,
    }

    setUserState(newUser)
    localStorage.setItem('token', token)
  }
}

export const handleLogout = () => {
  authStore.setState(prevState => ({
    ...prevState,
    user: null,
    isAuthenticated: false,
  }))
  localStorage.removeItem('token')
  window.location.reload()
}
