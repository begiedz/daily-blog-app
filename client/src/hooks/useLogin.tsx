import { jwtDecode } from 'jwt-decode'
import { loginRequest } from '../api/authApi'
import { setUserState } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
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

const useLogin = () => {
  const navigate = useNavigate()

  const handleLogin = async ({ event, username, password, setError }: IUseLoginProps) => {
    try {
      event.preventDefault()

      const { token } = await loginRequest(username, password)

      const decoded = jwtDecode<ITokenPayload>(token)

      const role = Object.values(Role).find(r => r === decoded.role) as Role
      if (!role) {
        throw new Error(`Invalid role received from token: ${decoded.role}`)
      }

      console.log('decoded token', decoded)

      const newUser = {
        username: decoded.unique_name,
        role: decoded.role,
      }
      console.log(newUser)
      setUserState(newUser)

      navigate('/')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  return { handleLogin }
}

export default useLogin
