import { TRole } from '../store/types'

export interface ITokenPayload {
  unique_name: string
  role: TRole
  exp: number
}

export interface IHandleLoginProps {
  username: string
  password: string
  setError: (error: string) => void
}

export interface IHandleRegisterProps extends IHandleLoginProps {
  email: string
}
