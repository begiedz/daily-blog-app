import { Store } from '@tanstack/react-store'
import { IPost } from "../types/index"

export const postsStore = new Store<IPost[] | []>([])

export const loadingPostsStore = new Store<boolean>(false)