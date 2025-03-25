import { Store } from '@tanstack/react-store'

interface IUser {
  id: number
  username: string
}

interface IAuthState {
  user: IUser | null
  token: string | null
  isAuthenticated: boolean
}

const initialState: IAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
}

export const authStore = new Store<IAuthState>(initialState)

export const loginUser = (user: IUser, token: string) => {
  authStore.setState(prevState => ({
    ...prevState,
    user,
    token,
    isAuthenticated: true,
  }))
}
