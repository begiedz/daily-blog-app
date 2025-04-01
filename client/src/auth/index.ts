import { jwtDecode } from 'jwt-decode'
import { loginRequest, registerRequest } from '../api/authApi'
import { authStore, setUserState } from '../store/authStore'
import { TRole } from '../store/types'

interface ITokenPayload {
  unique_name: string
  role: TRole
}

interface IHandleLoginProps {
  username: string
  password: string
  setError: (error: string) => void
}

interface IHandleRegisterProps extends IHandleLoginProps {
  email: string
}

export const handleLogin = async ({ username, password, setError }: IHandleLoginProps) => {
  try {
    const { token } = await loginRequest(username, password)
    const decoded = jwtDecode<ITokenPayload>(token)
    console.log('decoded token', decoded)

    const newUser = {
      username: decoded.unique_name,
      role: decoded.role,
    }

    setUserState(newUser)
    console.log(newUser)

    localStorage.setItem('token', token)
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Unknown error')
  }
}

export const handleRegister = async ({
  username,
  email,
  password,
  setError,
}: IHandleRegisterProps) => {
  try {
    await registerRequest(username, email, password)
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
