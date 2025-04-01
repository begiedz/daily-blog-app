import { jwtDecode } from 'jwt-decode'
import { loginRequest, registerRequest } from '../api/authApi'
import { authStore, setUserState } from '../store/authStore'
import { IHandleLoginProps, IHandleRegisterProps, ITokenPayload } from './types'

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
  if (!token) return

  try {
    const decoded = jwtDecode<ITokenPayload>(token)

    const now = Math.floor(Date.now() / 1000)
    if (decoded.exp && decoded.exp < now) {
      console.warn('Token expired')
      localStorage.removeItem('token')
      setUserState(null)
      return
    }

    const newUser = {
      username: decoded.unique_name,
      role: decoded.role,
    }

    setUserState(newUser)
    localStorage.setItem('token', token)
  } catch (error) {
    console.error('Invalid token', error)
    localStorage.removeItem('token')
    setUserState(null)
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
