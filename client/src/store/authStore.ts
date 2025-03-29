import { Store } from '@tanstack/react-store'

type TRole = 'user' | 'author' | 'admin'

export enum Role {
  user = 'user',
  author = 'author',
  admin = 'admin',
}

interface IUser {
  username: string
  role: TRole
}

interface IAuthState {
  user: IUser | null
  isAuthenticated: boolean
}

const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
}

export const authStore = new Store<IAuthState>(initialState)

export const setUserState = (user: IUser) => {
  authStore.setState(prevState => ({
    ...prevState,
    user,
    isAuthenticated: true,
  }))
}
