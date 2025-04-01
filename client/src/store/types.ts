export type TRole = 'user' | 'author' | 'admin'

export interface IUser {
  username: string
  role: TRole
}

export type TUser = IUser | null

export interface IAuthState {
  user: IUser | null
  isAuthenticated: boolean
}
