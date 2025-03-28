import { jwtDecode } from 'jwt-decode'
import { loginRequest } from '../api/authApi'
import { loginUser } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

interface ITokenPayload {
  id: number
  unique_name: string
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
      console.log('decoded token', decoded)

      const user = {
        id: decoded.id,
        username: decoded.unique_name,
      }
      console.log(user)
      loginUser(user, token)
      navigate('/')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  return { handleLogin }
}

export default useLogin
